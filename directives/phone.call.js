const generator = require('./generator')

module.exports = function (RED) {
  generator('phone.call', RED)
}
