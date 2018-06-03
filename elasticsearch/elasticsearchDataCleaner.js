var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
  host: 'ec2-52-22-142-216.compute-1.amazonaws.com:9200',
  log: 'trace'
})

client.indices.delete({
  index: 'traces',
  type: 'trace_id',
}, function (err, resp, status) {
  console.log(err)
  console.log(resp)
  console.log(status)
})
