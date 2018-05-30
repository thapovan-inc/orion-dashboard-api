'use strict'
const {api, Initializer, ActionHero} = require('actionhero')
const kafka = require('../lib/kafka')
var kafkaObj = new kafka();

const broadcastLifeFeed = (message) => {
    api.chatRoom.broadcast({}, "lifeFeed", message);
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
      await api.lifeFeed.doAThing();
      kafkaObj.startConsumer(broadcastLifeFeed);
      api.log('I started', 'debug', this.name)
  }

  async stop () {
      await api.lifeFeed.stopStuff();
      kafkaObj.stopConsumer();
      api.log('I stopped', 'debug', this.name)
  }
}

module.exports = MyInitializer;