'use strict'
const {api, Initializer} = require('actionhero')
const Kafka = require('../lib/Kafka')
var kafkaObj = new Kafka()

const broadcastLifeFeed = (message) => {
  api.chatRoom.broadcast({}, 'lifeFeed', message)
}

class MyInitializer extends Initializer {
  constructor () {
    super()
    this.name = 'lifeFeed'
    this.loadPriority = 1000
    this.startPriority = 1000
    this.stopPriority = 1000
  }

  async initialize () {
    api.lifeFeed = {}
    api.lifeFeed.doAThing = async () => {}
    api.lifeFeed.stopStuff = async () => {}
    api.log('I initialized', 'debug', this.name)
  }

  async start () {
    api.lifeFeed.doAThing()
    kafkaObj.startConsumer(broadcastLifeFeed)
    api.log('I started', 'debug', this.name)
  }

  async stop () {
    api.lifeFeed.stopStuff()
    kafkaObj.stopConsumer()
    api.log('I stopped', 'debug', this.name)
  }
}

module.exports = MyInitializer
