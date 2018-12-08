const mongoose = require('mongoose');
const showSchema = mongoose.Schema({
    //_id: Number,
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookingModel'
    },
    movieId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieModel'
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VendorRatingModel'
    },
    schedule: Date,
    capacity: Number,
    price: Number
}, {collection: 'shows'});
module.exports = showSchema;