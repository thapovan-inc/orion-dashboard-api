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