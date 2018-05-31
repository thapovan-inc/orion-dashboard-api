var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
  host: 'ec2-52-22-142-216.compute-1.amazonaws.com:9200',
  log: 'trace'
})

var allRecords = []

// first we do a search, and specify a scroll timeout
client.search({
  index: 'trace_id',
  type: 'trace_id',
  body: {
    query: {
      match: {
        'traceId': '4bd1acb3-ebd9-43ef-8aa7-260d7af20390'
      }
    }
  }
}).then(function (resp) {
  resp.hits.hits.forEach(function (hit) {
    allRecords.push(hit)
  })
  console.log('all done', allRecords)
}, function (err) {
  console.trace(err.message)
})
