const mongoose = require('mongoose');
const vendorRatingSchema = mongoose.Schema({
    theatre_name: String
}, {collection: 'vendorRatings'});
module.exports = vendorRatingSchema;