const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShowModel'
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TransactionModel'
    },
    seats: Number,
    total: Number,
    is_complete: Boolean
}, {collection: 'bookings'});

module.exports = bookingSchema;