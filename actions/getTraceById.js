const ActionHero = require('actionhero')
const es = require('../lib/elasticsearch')
var _es = new es()

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
      var arraySpanList = respJson.life_cycle_json.spanList;
      for(let i=0; i<arraySpanList.length; i++) {
        var timeDifferrence = (arraySpanList[i].endTime - arraySpanList[i].startTime);
        var duration = timeDifferrence / 1000;
        arraySpanList[i]['duration'] = duration;

        arraySpanList[i].startTime = new Date(arraySpanList[i].startTime/1000);
        arraySpanList[i].endTime = new Date(arraySpanList[i].endTime/1000);
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