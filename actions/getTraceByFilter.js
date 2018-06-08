const ActionHero = require('actionhero')
const es = require('../lib/elasticsearch')
var _es = new es()
var dateFormat = require('dateformat')
var changeCase = require('change-case')

module.exports = class TraceInfoBySearchTerm extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'getTraceByFilter'
    this.description = 'Will return information on trace by search term'
    this.inputs = {
      traceId: { required: false },
      startTime: { required: false },
      endTime: { required: false },
      duration: { required: false },
      status: { required: false },
      email: { required: false },
      userId: { required: false },
      serviceName: { required: false },
      country: { required: false },
      ip: { required: false }
    }
  }

  async run (data) {
    const api = ActionHero.api

    var startTime = (data.params.startTime == undefined) ? '' : new Date(data.params.startTime).getTime();
    var endTime = isNaN(data.params.endTime == undefined) ? '' : new Date(data.params.endTime).getTime();
    var status = (data.params.status == undefined) ? '' : data.params.status;
    var ip = (data.params.ip == undefined) ? '' : data.params.ip;

    var requestObj = []

    var responseObject = {
      success: false
    }

    var searchTerm = '';

    if(ip != '') {
      requestObj.push("ip: " +ip)
    }

    if(status != '') {
      requestObj.push(status)
    }

    for(let index = 0; index < requestObj.length; index++ ) {
      if(index >= (requestObj.length-1)) {
        searchTerm += "(" + requestObj[index] + ")";
      } else {
        searchTerm += "(" + requestObj[index] + ") AND ";
      }
    }
    api.log("searchterm : ", searchTerm);
    api.log("startTime : ", startTime);
    api.log("endTime : ", endTime);
    try {
      var result;
      if(searchTerm != '' && startTime != '' && endTime != '') {
        var startMicroSeconds = startTime*1000;
        var endMicroSeconds = endTime*1000;
        api.log("getAllTraceByAllFilters = startTime = "+ startMicroSeconds +" endTime " + endMicroSeconds +" search Term " + searchTerm)
        result = await _es.getAllTraceByAllFilters(searchTerm, startMicroSeconds, endMicroSeconds)
      }
      if(searchTerm == '' && (startTime != '' && endTime != '')) {
        var startMicroSeconds = startTime*1000;
        var endMicroSeconds = endTime*1000;
        api.log("getAllTraceByTimeRange = startTime = "+ startMicroSeconds +" endTime " + endMicroSeconds +" search Term " + searchTerm)
        result = await _es.getAllTraceByTimeRange(startMicroSeconds, endMicroSeconds)
      }
      if(searchTerm != '' && (startTime == '' && endTime == '')) {
        api.log("getAllTraceBySearchTerm = startTime = "+ startMicroSeconds +" endTime " + endMicroSeconds +" search Term " + searchTerm)
        result = await _es.getAllTraceBySearchTerm(searchTerm)
      }

      for(let index = 0;index< result.length; index++) {
        var traceData = result[index];
        var traceTimeDifferrence = (traceData.endTime - traceData.startTime)
        var traceDuration = Math.round(traceTimeDifferrence / 1000)
        var traceStatus = ''

        if(traceData.traceEventSummary.ERROR != 0 || traceData.traceEventSummary.CRITICAL != 0) {
          traceStatus = 'FAIL'
        } else {
          if(traceDuration > 4000) {
            traceStatus = 'SLOW'
          } else {
            traceStatus = 'PASS'
          }
        }
        traceData['duration'] = (traceDuration <=0 ) ? 0 : traceDuration;
        traceData['requestTime'] = Date.now(traceData.startTime);
        traceData['status'] = traceStatus
        traceData['serviceName'] = (traceData.traceName == undefined) ? '' : changeCase.titleCase(traceData.traceName)
        traceData['traceName'] = (traceData.traceName == undefined) ? '' : changeCase.titleCase(traceData.traceName)

        if(traceData.startTime>0) {
          traceData.startTime = dateFormat(traceData.startTime/1000, 'mm/dd/yyyy hh:ss:mm TT');
        } else {
          traceData.startTime = "Unknown";
        }

        if(traceData.endTime>0) {
          traceData.endTime = dateFormat(traceData.endTime/1000, 'mm/dd/yyyy hh:ss:mm TT');
        }  else {
          traceData.endTime = "Unknown";
        }
        traceData['type'] = 'searchData'
      }

      responseObject.data = result
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