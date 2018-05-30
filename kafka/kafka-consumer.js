var kafka = require('kafka-node')
var ConsumerGroup = kafka.ConsumerGroup

var options = {
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

// Or for a single topic pass in a string

var consumerGroup = new ConsumerGroup(options, 'requestStatistics')

consumerGroup.on('message', function (message) {
  console.log(message)
})

consumerGroup.on('error', function (err) {
  console.log('error', err)
})

process.on('SIGINT', function () {
  consumerGroup.close(true, function () {
    process.exit()
  })
})