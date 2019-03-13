const generator = require('./generator')

module.exports = function (RED) {
  generator('sticky', RED)
}
