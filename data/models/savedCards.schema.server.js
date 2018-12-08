const mongoose = require('mongoose');
const savedCardSchema = mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonModel'
    },
    cardNumber: Number,
    expires: Date,
    cardName: String,
    type: {type: String, enum: ['MASTER', 'VISA']},
    isPrimary: Boolean
}, {collection: 'savedCard'});
module.exports = savedCardSchema;