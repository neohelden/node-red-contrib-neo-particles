const Mustache = require('mustache')

module.exports = function (RED) {
  function NeoAtomSuggestion(n) {
    RED.nodes.createNode(this, n);
    var node = this;

    node.on('input', function (msg) {
      if (typeof msg.payload !== 'object') {
        node.error('Payload is not an object', msg)
        return
      }

      if (!('response' in msg.payload)) {
        msg.payload.response = {
          suggestions: []
        }
      }

      if (!('suggestions' in msg.payload.response)) {
        msg.payload.response.suggestions = []
      }

      msg.payload.response.suggestions.push({
        label: Mustache.render(n.label, msg.payload),
        value: Mustache.render(n.value, msg.payload),
      })

      node.send(msg)
    });
  }

  RED.nodes.registerType("atom-suggestion", NeoAtomSuggestion);
}
