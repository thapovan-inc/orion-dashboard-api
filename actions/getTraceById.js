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
      responseObject.data = result
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