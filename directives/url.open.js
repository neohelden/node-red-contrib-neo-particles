const generator = require('./generator')

module.exports = function (RED) {
  generator('url.open', RED)
}
