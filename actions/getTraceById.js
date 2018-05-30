const {Action} = require('actionhero')
const uuidv4 = require('uuid/v4')

module.exports = class TraceInfo extends Action {
  constructor () {
    super()
    this.name = 'getTraceById'
    this.description = 'Will return information on trace by id'
  }

  async run (data) {
    var requestStatistics = {traceId: uuidv4(), requestTime: Date.now(), duration: 1, status: 'PASS'}
    data.response.data = requestStatistics
  }
}