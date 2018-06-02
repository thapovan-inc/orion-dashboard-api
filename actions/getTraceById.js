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
    try {
      var result = await _es.getAllTraceById()
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