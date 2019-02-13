const generator = require('./generator')

module.exports = function (RED) {
  generator('audio.play', RED)
}
