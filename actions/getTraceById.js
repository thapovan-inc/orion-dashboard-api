const {Action} = require('actionhero')
const uuidv4 = require('uuid/v4')
const es = require('../elasticsearch/elasticsearchDataFetchAll')
var _es = new es()
module.exports = class TraceInfo extends Action {
  constructor () {
    super()
    this.name = 'getTraceById'
    this.description = 'Will return information on trace by id'
  }

  async run (data) {
    console.log(data);
    try {
      _es.getAllTraceById(sendData)
    } catch (err) {
      console.log('err : ', err)
    }

  }
}

const sendData = (result) => {
  console.log(result)
}
