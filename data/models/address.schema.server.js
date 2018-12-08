const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonModel'
    },
    line1: String,
    line2: String,
    city: String,
    country: String,
    isPrimary: Boolean,
    zip: Number
}, {collection: 'address'});
module.exports = addressSchema;