const mongoose = require('mongoose');
const vendorRatingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VendorModel'
    },
    rating: Number,
    comment: String
}, {collection: 'vendorRatings'});
module.exports = vendorRatingSchema;