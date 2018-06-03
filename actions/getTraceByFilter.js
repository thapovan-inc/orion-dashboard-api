const ActionHero = require('actionhero')
const es = require('../lib/elasticsearch')
var _es = new es()

module.exports = class TraceInfoBySearchTerm extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'getTraceByFilter'
    this.description = 'Will return information on trace by search term'
    this.inputs = {
      traceId: { required: false },
      fromTime: { required: false },
      toTime: { required: false },
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
    // var today = new Date();
    // var fromTime = today.setDate(today.getDate() - 1)
    // var toTime = (new Date()).getTime()
    // return
    //
    var traceId = (data.params.traceId == undefined) ? '' : data.params.traceId;
    // var fromTime = isNaN(data.params.fromTime) ? fromTime : (data.params.fromTime).getTime();
    // var toTime = isNaN(data.params.toTime) ? toTime : (data.params.toTime).getTime();
    var duration = isNaN(data.params.duration) ? '' : data.params.duration;
    var status = (data.params.status == undefined) ? '' : data.params.status;
    var email = (data.params.email == undefined) ? '' : data.params.email;
    var userId = (data.params.userId == undefined) ? '' : data.params.userId;
    var serviceName = (data.params.serviceName == undefined) ? '' : data.params.serviceName;
    var country = (data.params.country == undefined) ? '' : data.params.country;
    var ip = (data.params.ip == undefined) ? '' : data.params.ip;

    var requestObj = {
      // fromTime: fromTime,
      // toTime: toTime,
    }
    var responseObject = {
      success: false
    }
    if(traceId != '') {
      requestObj.traceId = traceId
    }
    if(duration != '') {
      requestObj.duration = duration
    }
    if(status != '') {
      requestObj.status = status
    }
    if(email != '') {
      requestObj.email = email
    }
    if(userId != '') {
      requestObj.userId = userId
    }
    if(serviceName != '') {
      requestObj.serviceName = serviceName
    }
    if(country != '') {
      requestObj.country = country
    }
    if(ip != '') {
      requestObj.ip = ip
    }

    try {
      var result = await _es.getAllTraceByFilters(requestObj)
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