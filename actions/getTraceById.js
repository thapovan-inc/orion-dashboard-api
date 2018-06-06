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
      api.log('API resp : ', respJson.life_cycle_json);
      respJson.life_cycle_json['traceName'] = changeCase.titleCase(respJson.life_cycle_json['traceName']);

      var arraySpanList = respJson.life_cycle_json.spanList;

      for(let i=0; i<arraySpanList.length; i++) {
        var timeDifferrence = (arraySpanList[i].endTime - arraySpanList[i].startTime);
        var duration = timeDifferrence / 1000;
        arraySpanList[i]['duration'] = duration +" ms";
        arraySpanList[i]['serviceName'] = changeCase.titleCase(arraySpanList[i]['serviceName']);

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
        arraySpanList[i]['status'] = status;
        arraySpanList[i]['labelStatus'] = labelStatus;

        delete arraySpanList[i].logSummary;
        delete arraySpanList[i].children;
        delete arraySpanList[i].traceId;
        delete arraySpanList[i].traceName;

        if(arraySpanList[i].startTime>0) {
          arraySpanList[i].startTime = dateFormat(arraySpanList[i].startTime/1000, 'mm/dd/yyyy hh:ss:mm');
        }
        if(arraySpanList[i].endTime>0) {
          arraySpanList[i].endTime = dateFormat(arraySpanList[i].endTime/1000, 'mm/dd/yyyy hh:ss:mm');
        }

        var events = arraySpanList[i].events;

        for(let j=0; j<events.length; j++) {
          delete events[j].traceId;
          delete events[j].spanId;
          delete events[j].eventId;
        }
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