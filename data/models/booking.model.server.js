const mongoose = require('mongoose')

const bookingSchema = require('./booking.schema.server')
const bookingModel = mongoose.model('BookingModel', bookingSchema)

module.exports = bookingModel;