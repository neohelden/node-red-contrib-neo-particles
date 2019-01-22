const generator = require('./generator')

module.exports = function (RED) {
  generator('media', RED, (data) => {
    data.volume = parseFloat(data.volume)
    return data
  })
}
