var _elasticsearch = require('elasticsearch')
var client = new _elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST || 'ec2-52-22-142-216.compute-1.amazonaws.com:9200',
  log: 'trace'
})

var allRecords = []

class elasticsearch {

  getAllTraces () {
    allRecords = []
    return new Promise(function (resolve, reject) {
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
            reject(error)
          }
          // collect all the records
          response.hits.hits.forEach(function (hit) {
            allRecords.push(hit._source)
          })
          resolve(allRecords)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  getAllTraceById () {
    allRecords = []
    return new Promise(function (resolve, reject) {
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
            reject(error)
          }
          // collect all the records
          response.hits.hits.forEach(function (hit) {
            allRecords.push(hit._source)
          })
          resolve(response.hits.hits[0]._source)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  getAllTraceByFilters () {
    allRecords = []
    var searchTerm = {
      'traceId': '4bd1acb3-ebd9-43ef-8aa7-260d7af20390',
      'ip': '192.168.1.1',
      'country': 'india'
    }
    return new Promise(function (resolve, reject) {
      try {
        client.search({
          index: 'trace_id',
          type: 'trace_id',
          body: {
            query: {
              match: {
                'wildcard': {searchTerm}
              }
            }
          }
        }, function getMoreUntilDone (error, response) {
          if (error) {
            reject( error)
          }
          // collect all the records
          response.hits.hits.forEach(function (hit) {
            allRecords.push(hit._source)
          })
          resolve(allRecords)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = elasticsearch
