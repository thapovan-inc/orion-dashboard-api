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

  getAllTraceByAllFilters (requestObj, startTime, endTime) {
    api.log("getAllTraceByAllFilters")
    allRecords = []
    return new Promise(function (resolve, reject) {
      try {
        client.search({
          index: 'summaries',
          type: 'su',
          body: {
            "query": {
              "bool": {
                "must": {
                  "query_string": {
                    "query": requestObj
                  }
                },
                "filter": {
                  "range": {
                    "startTime": {
                      "gte": startTime,
                      "lt": endTime
                    }
                  }
                }
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

  getAllTraceByTimeRange (startTime, endTime) {
    api.log("getAllTraceByTimeRange")
    allRecords = []
    return new Promise(function (resolve, reject) {
      try {
        client.search({
          index: 'summaries',
          type: 'su',
          body: {
            "query": {
              "bool": {
                "must": {
                  "match_all": {}
                },
                "filter": {
                  "range": {
                    "startTime": {
                      "gte": startTime,
                      "lt": endTime
                    }
                  }
                }
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

  getAllTraceBySearchTerm (searchTerm) {
    api.log("getAllTraceBySearchTerm")
    allRecords = []
    return new Promise(function (resolve, reject) {
      try {
        client.search({
          index: 'summaries',
          type: 'su',
          body: {
            "query": {
              "query_string": {
                "query": searchTerm
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
