const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: 'UserModel'
    },
    showId: {
        type: String,
        ref: 'ShowModel'
    },
    seats: Number,
    amountPaid: Number
}, {collection: 'bookings'});

module.exports = bookingSchema;