const bookingModel = require('../models/booking.model.server')

createBooking = (booking) => bookingModel.create(booking);

findAllBookings = () => bookingModel.find();

findBookingByUser = userId => bookingModel.find({userId:userId});

findBookingById = bookingId => bookingModel.findById(bookingId);

deleteBookingById  = (_id) => bookingModel.remove({_id:_id});


module.exports = {
    createBooking,findAllBookings,findBookingByUser,findBookingById,deleteBookingById
}