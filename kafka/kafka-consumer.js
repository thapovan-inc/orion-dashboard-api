var kafka = require('kafka-node')
var ConsumerGroup = kafka.ConsumerGroup
var client = new kafka.Client("54.83.197.74:29092");

var options = {
  kafkaHost: 'kafka:29092',
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



var consumerGroup = new ConsumerGroup(options, 'trace-summary-json')

consumerGroup.on('message', function (message) {
  console.log(message);
});
client.loadMetadataForTopics(["NonExistentTopic"], (err, resp) => {
  console.log(JSON.stringify(resp))
});
consumerGroup.on('error', function (err) {
  console.log('error', err)
})

process.on('SIGINT', function () {
  consumerGroup.close(true, function () {
    process.exit()
  })
})