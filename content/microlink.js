module.exports = function (RED) {
  function NeoContentMicrolink(n) {
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

      let contentPayload = {
        type: 'microlink'
      }

      if (n.url && n.url.length > 0) contentPayload.url = n.url
      if (n.size && n.size.length > 0) contentPayload.size = n.size
      if (n.contrast) contentPayload.contrast = n.contrast

      msg.payload.response.content.push(contentPayload)
      node.send(msg)
    });
  }

  RED.nodes.registerType("content-microlink", NeoContentMicrolink);
}
