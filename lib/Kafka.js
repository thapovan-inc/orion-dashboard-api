const ActionHero = require('actionhero')
var kafka = require('kafka-node')
var ConsumerGroup = kafka.ConsumerGroup

const api = ActionHero.api
const options = {
  // kafkaHost: process.env.KAFKA_HOST || 'localhost:29092',
  kafkaHost: 'kafka:29092',
  groupId: 'ExampleTestGrouping',
  sessionTimeout: 5000,
  protocol: ['roundrobin'],
  fromOffset: 'earliest',
  commitOffsetsOnFirstJoin: true,
  outOfRangeOffset: 'earliest',
  migrateHLC: false,
  migrateRolling: true,
  onRebalance: (isAlreadyMember, callback) => { callback() } // or null
}

// var topic = process.env.KAFKA_TOPIC || 'trace-summary-json';
var topic = 'trace-summary-json';

const consumerGroup = new ConsumerGroup(options, topic)
// const consumerGroupApiAggregation = new ConsumerGroup(options, 'apiAggregation')

module.exports = class Kafka {
  startConsumer (callback) {
    consumerGroup.on('message', function (message) {
      api.log('message : ', message)
      var trace = JSON.parse(message.value)
      trace['type'] = 'liveFeed'
      callback(JSON.stringify(trace))
    })
    // consumerGroupApiAggregation.on('message', function (message) {
    //   var trace = JSON.parse(message.value)
    //   trace['type'] = 'api'
    //   callback(JSON.stringify(trace))
    // })

    consumerGroup.on('error', function (err) {
      api.log(err)
      callback(err)
    })
  }

  stopConsumer () {
    process.on('SIGINT', function () {
      consumerGroup.close(true, function () {
        process.exit()
      })
    })
  }
}
