var _elasticsearch = require('elasticsearch')
var client = new _elasticsearch.Client({
  // host: process.env.ELASTICSEARCH_HOST || 'localhost:9200',
  host: 'elasticsearchhost:9200',
  log: 'trace'
})

var allRecords = []

class elasticsearch {

  getAllTraces () {
    allRecords = []
    return new Promise(function (resolve, reject) {
      try {
        client.search({
          index: 'summary',
          type: 'su',
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
          if(response.hasOwnProperty('hits')) {
            response.hits.hits.forEach(function (hit) {
              allRecords.push(hit._source)
            })
            resolve(allRecords)
          }
          reject('undefined error')
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  getAllTraceById (traceId) {
    allRecords = []
    return new Promise(function (resolve, reject) {
      try {
        client.search({
          index: 'footprint',
          type: 'fp',
          body: {
            query: {
              match: {
                'traceId': traceId
              }
            }
          }
        }, function getMoreUntilDone (error, response) {
          if (error) {
            reject(error)
          }
          // collect all the records
          if(response.hasOwnProperty('hits')) {
            response.hits.hits.forEach(function (hit) {
              allRecords.push(hit._source)
            })
            resolve(allRecords)
          }
          reject('undefined error')
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  getAllTraceByFilters (requestObj) {
    allRecords = []
    return new Promise(function (resolve, reject) {
      try {
        client.search({
          index: 'summary',
          type: 'su',
          body: {
            query: {
              match: {
                "ip": "192.168.1.1"
              }
            }
          }
        }, function getMoreUntilDone (error, response) {
          if (error) {
            reject( error)
          }
          // collect all the records
          if(response.hasOwnProperty('hits')) {
            response.hits.hits.forEach(function (hit) {
              allRecords.push(hit._source)
            })
            resolve(allRecords)
          }
          reject('undefined error')
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = elasticsearch
