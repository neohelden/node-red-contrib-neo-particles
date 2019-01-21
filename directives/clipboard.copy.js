const generator = require('./generator')

module.exports = function (RED) {
  generator('clipboard.copy', RED)
}
