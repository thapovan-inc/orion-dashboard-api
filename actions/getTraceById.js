const ActionHero = require('actionhero')
const es = require('../lib/elasticsearch')
var _es = new es()
var dateFormat = require('dateformat')
var changeCase = require('change-case')

module.exports = class TraceInfoById extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'getTraceById'
    this.description = 'Will return information on trace by id'
    this.inputs = {
      traceId: {
        required: true
      }
    }
  }

  async run (data) {
    const api = ActionHero.api
    var responseObject = {
      success: false
    }
    var regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    var traceId = data.params.traceId;

    if(traceId == null || traceId == undefined) {
      responseObject.data = []
      responseObject.success = false
      responseObject.message = 'Please enter the trace id'
      data.response.result = responseObject
      return
    }
    if(!regex.test(traceId)) {
      responseObject.success = false
      responseObject.message = 'Invalid trace id'
      data.response.result = responseObject
      return
    }

    try {
      var result = await _es.getAllTraceById(traceId)
      var respJson = {
        traceId: traceId,
        life_cycle_json: JSON.parse(result[0].life_cycle_json)
      }

      respJson.life_cycle_json['traceName'] = changeCase.titleCase(respJson.life_cycle_json['traceName']);

      var traceTimeDifferrence = (respJson.life_cycle_json.endTime - respJson.life_cycle_json.startTime);
      var traceDuration = Math.round(traceTimeDifferrence / 1000);

      var traceStatus = ''
      var traceLabelStatus = ''

      if(respJson.life_cycle_json.traceEventSummary.ERROR != 0 || respJson.life_cycle_json.traceEventSummary.CRITICAL != 0) {
        traceStatus = 'FAIL'
        traceLabelStatus = 'error'
      } else {
        if(traceDuration > 4000) {
          traceStatus = 'SLOW'
          traceLabelStatus = 'warning'
        } else {
          traceStatus = 'PASS'
          traceLabelStatus = 'success'
        }
      }

      respJson.life_cycle_json['duration'] = (traceDuration <= 0) ? 0 : traceDuration;
      respJson.life_cycle_json['status'] = traceStatus;
      respJson.life_cycle_json['labelStatus'] = traceLabelStatus;

      if(respJson.life_cycle_json.startTime>0) {
        respJson.life_cycle_json.startTime = new Date(respJson.life_cycle_json.startTime/1000).toUTCString();
      } else {
        respJson.life_cycle_json.startTime = "Unknown";
      }

      if(respJson.life_cycle_json.endTime>0) {
        respJson.life_cycle_json.endTime = new Date(respJson.life_cycle_json.endTime/1000).toUTCString();
      } else {
        respJson.life_cycle_json.endTime = "Unknown";
      }

      var arraySpanList = respJson.life_cycle_json.spanList;

      for(let i=0; i<arraySpanList.length; i++) {

        arraySpanList[i]['serviceName'] = changeCase.titleCase(arraySpanList[i]['serviceName']);

        var timeDifferrence = (arraySpanList[i].endTime - arraySpanList[i].startTime);
        var duration = Math.round(timeDifferrence / 1000);

        var status = ''
        var labelStatus = ''

        if(arraySpanList[i].logSummary.ERROR != 0 || arraySpanList[i].logSummary.CRITICAL != 0) {
          status = 'FAIL'
          labelStatus = 'error'
        } else {
          if(duration > 4000) {
            status = 'SLOW'
            labelStatus = 'warning'
          } else {
            status = 'PASS'
            labelStatus = 'success'
          }
        }
        arraySpanList[i]['duration'] = (duration <= 0) ? 0 : duration;
        arraySpanList[i]['status'] = status;
        arraySpanList[i]['labelStatus'] = labelStatus;

        if(arraySpanList[i].startTime>0) {
          arraySpanList[i].startTime = new Date(arraySpanList[i].startTime/1000).toUTCString();
        } else {
          arraySpanList[i].startTime = "Unknown";
        }

        if(arraySpanList[i].endTime>0) {
          arraySpanList[i].endTime = new Date(arraySpanList[i].endTime/1000).toUTCString();
        } else {
          arraySpanList[i].endTime = "Unknown";
        }

        var events = arraySpanList[i].events;

        for(let j=0; j<events.length; j++) {
          delete events[j].traceId;
          delete events[j].spanId;
          delete events[j].eventId;
        }

        delete arraySpanList[i].logSummary;
        delete arraySpanList[i].children;
        delete arraySpanList[i].traceId;
        delete arraySpanList[i].traceName;
      }
      responseObject.data = respJson
      responseObject.success = true
    } catch (err) {
      responseObject.data = []
      responseObject.success = false
      responseObject.error = err
      api.log('err : ', err)
    } finally {
      data.response.result = responseObject
    }
  }
}