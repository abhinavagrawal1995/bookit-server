const mongoose = require('mongoose');
const phoneSchema = mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonModel'
    },
    phone: Number,
    isPrimary: Boolean
}, {collection: 'phone'});
module.exports = phoneSchema;