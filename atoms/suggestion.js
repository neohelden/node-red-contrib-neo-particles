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
        label: n.label,
        value: n.value,
      })

      node.send(msg)
    });
  }

  RED.nodes.registerType("atom-suggestion", NeoAtomSuggestion);
}
