var kafka = require('kafka-node'),
  HighLevelProducer = kafka.HighLevelProducer,
  client = new kafka.Client('localhost:32181'),
  producer = new HighLevelProducer(client)
const uuidv4 = require('uuid/v4')

var durations = [1, 2, 3, 4, 5]
var status = ['PASS', 'SLOW', 'FAIL']

var apiAggregation = {
  data: [
    {apiName: 'SignUp', passCount: 1000, failCount: 100, slowCount: 50, totalCount: 1150},
    {apiName: 'SignIn', passCount: 2000, failCount: 200, slowCount: 100, totalCount: 2300},
    {apiName: 'UserProfile', passCount: 500, failCount: 50, slowCount: 150, totalCount: 700}
  ]
}
var apiAggregationBuffer = Buffer.from(JSON.stringify(apiAggregation))

producer.on('ready', function () {
  setInterval(() => {
    var requestStatistics = {
      traceId: uuidv4(),
      requestTime: Date.now(),
      duration: durations[getValue(durations)],
      status: status[getValue(status)]
    }
    var requestStatisticsBuffer = Buffer.from(JSON.stringify(requestStatistics))
    var payloads = [
      {topic: 'requestStatistics', messages: requestStatisticsBuffer},
      {topic: 'apiAggregation', messages: apiAggregationBuffer}
    ]
    producer.send(payloads, function (err, data) {
      if (err) {
        console.log(err)
      }
      console.log(data)
    })
  }, 1000)
})

function getValue (array) {
  let retValue = Math.floor(Math.random() * array.length)
  return retValue
}
