const bookingModel = require('../models/booking.model.server')

createBooking = (userId, showId) => bookingModel.create(userId, showId)

findAllBookings = () => bookingModel.find()

findBookingById = userId => bookingModel.findById(userId)

module.exports = {
    createBooking,
    findAllBookings,
    findBookingById
}