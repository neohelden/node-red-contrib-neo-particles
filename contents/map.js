const generator = require('./generator')

module.exports = function (RED) {
  generator('map', RED, (data) => {
    data.lng = parseFloat(data.lng)
    data.lat = parseFloat(data.lat)
    data.zoom = parseInt(data.zoom, 10)
    return data
  })
}
