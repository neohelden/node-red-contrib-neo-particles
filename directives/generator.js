const _ = require('lodash')
const Mustache = require('mustache')

module.exports = function (directiveType, RED) {
  RED.nodes.registerType(`directive-${directiveType}`, function (config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.on('input', function (msg) {
      if (typeof msg.payload !== 'object') {
        node.error('Payload is not an object', msg)
        return
      }

      if (!_.get(msg.payload, 'response.directives')) {
        _.set(msg.payload, 'response.directives', [])
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

      msg.payload.response.directives.push({ type: directiveType, data })

      node.send(msg)
    });
  });
}