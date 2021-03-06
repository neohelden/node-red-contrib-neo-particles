const _ = require('lodash')
const Mustache = require('mustache')

module.exports = function (contentType, RED, dataProcessor) {
  RED.nodes.registerType(`content-${contentType}`, function (config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.on('input', function (msg) {
      if (typeof msg.payload !== 'object') {
        node.error('Payload is not an object', msg)
        return
      }

      if (!_.get(msg.payload, 'response.content')) {
        _.set(msg.payload, 'response.content', [])
      }

      let contentPayload = {
        type: contentType
      }

      // clone and sanitize the original config object
      let data = _.cloneDeep(config)
      delete data.id
      delete data.name
      delete data.type
      delete data.z
      delete data.x
      delete data.y
      delete data.wires

      data = _.mapValues(data, (v) => {
        if (_.isString(v)) {
          let view = _.cloneDeep(msg.payload)
          view.task = msg.task || {}
          return Mustache.render(v, view)
        }

        return v
      })

      if (data.speak) {
        contentPayload.speak = data.speak
        delete data.speak
      }

      contentPayload.data = dataProcessor ? dataProcessor(data) : data
      msg.payload.response.content.push(contentPayload)

      node.send(msg)
    });
  });
}
