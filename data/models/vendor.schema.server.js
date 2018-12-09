const mongoose = require('mongoose');
const vendorSchema = mongoose.Schema({

    theatreName: {
        type: String
    }
}, {collection: 'vendor'});
module.exports = vendorSchema;