var _elasticsearch = require('elasticsearch')
var client = new _elasticsearch.Client({
  host: 'ec2-52-22-142-216.compute-1.amazonaws.com:9200',
  log: 'trace'
})

var allRecords = []

class elasticsearch {
  getAllTraces (callback) {
    allRecords = []
    try {
      client.search({
        index: 'trace_id',
        type: 'trace_id',
        body: {
          query: {
            'match_all': {}
          }
        }
      }, function getMoreUntilDone (error, response) {
        if (error) {
          console.log(error.message)
          callback(error.message)
        }
        // collect all the records
        response.hits.hits.forEach(function (hit) {
          allRecords.push(hit)
        })
        callback(allRecords)
      })
    } catch (err) {
      callback(err.message)
      console.log(err.message)
    }
  }

  getAllTraceById (callback) {
    allRecords = []
    try {
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
      }, function getMoreUntilDone (error, response) {
        if (error) {
          console.log(error.message)
          callback(error.message)
        }
        // collect all the records
        response.hits.hits.forEach(function (hit) {
          allRecords.push(hit)
        })
        callback(allRecords)
      })
    } catch (err) {
      callback(err.message)
      console.log(err.message)
    }
  }
}

module.exports = elasticsearch
