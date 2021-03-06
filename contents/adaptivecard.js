const _ = require('lodash')
const Mustache = require('mustache')

module.exports = function (RED) {
  function NeoContentAdaptivecard(n) {
    RED.nodes.createNode(this, n);
    var node = this;

    node.on('input', function (msg) {
      if (typeof msg.payload !== 'object') {
        node.error('Payload is not an object', msg)
        return
      }

      if (!_.get(msg.payload, 'response.content')) {
        _.set(msg.payload, 'response.content', [])  
      }

      let view = _.cloneDeep(msg.payload)
      view.task = msg.task || {}

      let templatedCard = Mustache.render(n.card, view)
      var cardPayload = {}
      try {
        cardPayload = JSON.parse(templatedCard)
      } catch (e) {
        node.error('Parsing AdaptiveCard payload failed: ' + e.toString(), msg)
      }

      msg.payload.response.content.push({
        type: 'adaptivecard',
        speak: Mustache.render(n.speak, view),
        data: { card: cardPayload }
      })

      node.send(msg)
    });
  }

  RED.nodes.registerType("content-adaptivecard", NeoContentAdaptivecard);
}
