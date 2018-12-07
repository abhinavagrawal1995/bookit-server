const mongoose = require('mongoose');
const showSchema = mongoose.Schema({
    //_id: Number,
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VendorRatingModel'
    },
    schedule: Date,
    capacity: Number,
    price: Number
}, {collection: 'shows'});
module.exports = showSchema;