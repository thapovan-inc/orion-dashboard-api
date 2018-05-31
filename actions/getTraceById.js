const {Action} = require('actionhero')
const uuidv4 = require('uuid/v4')

module.exports = class TraceInfo extends Action {
  constructor () {
    super()
    this.name = 'getTraceById'
    this.description = 'Will return information on trace by id'
  }

  async run (data) {
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
