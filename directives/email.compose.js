const Mustache = require('mustache')

module.exports = function (RED) {
  function NeoDirectiveEmailCompose(n) {
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

      let mailComposeData = {
        recipients: n.recipients
      }

      if (n.subject && n.subject.length > 0) mailComposeData.subject = Mustache.render(n.subject, msg.payload)
      if (n.body && n.body.length > 0) mailComposeData.body = Mustache.render(n.body, msg.payload)
      if (n.cc && n.cc.length > 0) mailComposeData.cc = Mustache.render(n.cc, msg.payload)
      if (n.bcc && n.bcc.length > 0) mailComposeData.bcc = Mustache.render(n.bcc, msg.payload)

      msg.payload.response.directives.push({
        type: 'email.compose',
        data: mailComposeData
      })

      node.send(msg)
    });
  }

  RED.nodes.registerType("directive-email-compose", NeoDirectiveEmailCompose);
}
