const _ = require('lodash')
const Mustache = require('mustache')

module.exports = function (RED) {
  function NeoContentHTML(n) {
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

      msg.payload.response.content.push({
        type: 'html',
        text: Mustache.render(n.html, msg.payload)
      })

      node.send(msg)
    });
  }

  RED.nodes.registerType("content-html", NeoContentHTML);
}
