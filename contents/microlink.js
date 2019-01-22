const generator = require('./generator')

module.exports = function (RED) {
  generator('microlink', RED)
}
