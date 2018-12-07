const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShowModel'
    },
    seats: Number,
    total: Number,
    is_complete: Boolean
}, {collection: 'bookings'});
module.exports = bookingSchema;