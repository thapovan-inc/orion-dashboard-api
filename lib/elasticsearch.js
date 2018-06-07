const ActionHero = require('actionhero')
const api = ActionHero.api
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
          index: 'footprint',
          type: 'fp',
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
          index: 'summaries',
          type: 'su',
          body: {
            "query": {
              "query_string": {
                "query": "(status: PASS OR status: FAIL or status: SLOW) AND (traceId: 5b55baa6-3b9e-4f82-a83c-21be96b140ed) AND ()"
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
