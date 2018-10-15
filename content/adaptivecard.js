module.exports = function (RED) {
  function NeoContentAdaptivecard(n) {
    RED.nodes.createNode(this, n);
    var node = this;

    node.on('input', function (msg) {
      if (typeof msg.payload !== 'object') {
        node.error('Payload is not an object', msg)
        return
      }

      if (!('response' in msg.payload)) {
        msg.payload.response = {
          content: []
        }
      }

      if (!('content' in msg.payload.response)) {
        msg.payload.response.content = []
      }

      msg.payload.response.content.push({
        type: 'adaptivecard',
        card: n.card
      })

      node.send(msg)
    });
  }

  RED.nodes.registerType("content-adaptivecard", NeoContentAdaptivecard);
}
