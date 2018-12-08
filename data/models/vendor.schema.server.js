const mongoose = require('mongoose');
const vendorSchema = mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonModel'
    },
    theatreName: [{
        type: String
    }]
}, {collection: 'vendor'});
module.exports = vendorSchema;