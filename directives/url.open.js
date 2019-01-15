const Mustache = require('mustache')

module.exports = function (RED) {
  function NeoDirectiveURLOpen(n) {
    RED.nodes.createNode(this, n);
    var node = this;

    node.on('input', function (msg) {
      if (typeof msg.payload !== 'object') {
        node.error('Payload is not an object', msg)
        return
      }

      if (!('response' in msg.payload)) {
        msg.payload.response = {
          directives: []
        }
      }

      if (!('directives' in msg.payload.response)) {
        msg.payload.response.directives = []
      }

      msg.payload.response.directives.push({
        type: 'url.open',
        data: {
          url: Mustache.render(n.url, msg.payload)
        }
      })

      node.send(msg)
    });
  }

  RED.nodes.registerType("directive-url-open", NeoDirectiveURLOpen);
}
