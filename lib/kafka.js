var kafka = require('kafka-node')
var ConsumerGroup = kafka.ConsumerGroup
var Client = kafka.Client
const {api} = require('actionhero')
const options = {
  kafkaHost: 'localhost:29092',
  groupId: 'ExampleTestGroup',
  sessionTimeout: 15000,
  protocol: ['roundrobin'],
  fromOffset: 'earliest',
  commitOffsetsOnFirstJoin: true,
  outOfRangeOffset: 'earliest',
  migrateHLC: false,
  migrateRolling: true,
  onRebalance: (isAlreadyMember, callback) => { callback() } // or null
}

module.exports = class kafka {
  startConsumer (callback) {
    console.log('startConsumer')
    const consumerGroup = new ConsumerGroup(options, 'requestStatistics')
    let retValue = 'Test'
    consumerGroup.on('message', function (message) {
      let val = message.value
      retValue = message.value
      console.log('consumerGroup : ', retValue)

      callback(message.value)
    })

    consumerGroup.on('error', function (err) {
      console.log(err)
      retValue = err

      callback(err)
    })
    console.log('retValue : ', retValue)
  }

  stopConsumer () {
    console.log('stopConsumer')
    process.on('SIGINT', function () {
      consumerGroup.close(true, function () {
        process.exit()
      })
    })
    console.log('stopConsumer')
  }
}
