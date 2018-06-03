var kafka = require('kafka-node')
var ConsumerGroup = kafka.ConsumerGroup

const options = {
  kafkaHost: '54.83.197.74:29092',
  // kafkaHost: 'localhost:29092',
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

// var topic = 'requestStatistics';
var topic = 'incoming-request';

const consumerGroup = new ConsumerGroup(options, topic)
const consumerGroupApiAggregation = new ConsumerGroup(options, 'apiAggregation')

module.exports = class Kafka {
  startConsumer (callback) {
    consumerGroup.on('message', function (message) {
      var trace = JSON.parse(message.value)
      trace['type'] = 'liveFeed'
      callback(JSON.stringify(trace))
    })
    consumerGroupApiAggregation.on('message', function (message) {
      var trace = JSON.parse(message.value)
      trace['type'] = 'api'
      callback(JSON.stringify(trace))
    })

    consumerGroup.on('error', function (err) {
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
