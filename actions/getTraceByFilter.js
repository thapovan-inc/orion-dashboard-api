const ActionHero = require('actionhero')
const es = require('../lib/elasticsearch')
var _es = new es()

module.exports = class TraceInfoBySearchTerm extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'getTraceByFilter'
    this.description = 'Will return information on trace by search term'
  }

  async run (data) {
    const api = ActionHero.api
    var responseObject = {
      success: false
    }
    try {
      var result = await _es.getAllTraceByFilters()
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