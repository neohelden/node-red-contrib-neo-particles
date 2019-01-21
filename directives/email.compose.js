const generator = require('./generator')

module.exports = function (RED) {
  generator('email.compose', RED)
}
