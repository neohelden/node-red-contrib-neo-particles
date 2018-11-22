module.exports = function (RED) {
  function NeoContentPlain(n) {
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
        type: 'plain',
        text: n.text
      })

      node.send(msg)
    });
  }

  RED.nodes.registerType("content-plain", NeoContentPlain);
}
