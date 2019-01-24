const generator = require('./generator')

module.exports = function (RED) {
  generator('user.message', RED)
}
