const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonModel'
    }
}, {collection: 'admin'});
module.exports = adminSchema;