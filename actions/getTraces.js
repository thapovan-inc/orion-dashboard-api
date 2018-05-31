const {Action} = require('actionhero')
const es = require('../elasticsearch/elasticsearchDataFetchAll')

var _es = new es()

module.exports = class TraceInfo extends Action {
  constructor () {
    super()
    this.name = 'getTraces'
    this.description = 'Will return information of all traces'
  }

  run (data) {
    try {
      _es.getAllTraces(sendData)
    } catch (err) {
      console.log('err : ', err)
    }

  }
}

const sendData = (result) => {
  console.log(result)
}
