const ActionHero = require('actionhero')
const es = require('../lib/elasticsearch')
var _es = new es()

module.exports = class TraceInfo extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'getTraces'
    this.description = 'Will return information of all traces'
  }

  async run (data) {
    const api = ActionHero.api
    api.log('host : ', process.env)
    var responseObject = {
      success: false
    }
    try {
      var result = await _es.getAllTraces()

      for(let arr=0; arr<result.length; arr++) {
        var respJson = {
          traceId: result[arr].traceId,
          life_cycle_json: JSON.parse(result[arr].life_cycle_json)
        }
        respJson.life_cycle_json['traceName'] = changeCase.titleCase(respJson.life_cycle_json['traceName']);
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
          arraySpanList[i]['status'] = status;
          arraySpanList[i]['labelStatus'] = labelStatus;

          if(arraySpanList[i].startTime>0) {
            arraySpanList[i].startTime = dateFormat(arraySpanList[i].startTime/1000, 'mm/dd/yyyy hh:ss:mm');
          } else {
            arraySpanList[i].startTime = "Unknown";
          }

          if(arraySpanList[i].endTime>0) {
            arraySpanList[i].endTime = dateFormat(arraySpanList[i].endTime/1000, 'mm/dd/yyyy hh:ss:mm');
          } else {
            arraySpanList[i].endTime = "Unknown";
          }

          if(arraySpanList[i].startTime<=0 || arraySpanList[i].endTime<=0) {
            arraySpanList[i]['duration'] = "Unknown";
          } else {
            arraySpanList[i]['duration'] = duration +" ms";
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
        responseObject.data.push(respJson)
      }
      responseObject.success = true
    } catch (err) {
      responseObject.data = []
      responseObject.success = err
      responseObject.error = false
      api.log('err : ', err)
    } finally {
      data.response.result = responseObject
    }
  }
}