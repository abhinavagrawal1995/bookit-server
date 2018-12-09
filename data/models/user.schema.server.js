const mongoose = require('mongoose');
const registeredUserSchema = mongoose.Schema({
    personId: {
        type: String,
        ref: 'PersonModel'
    },
    dob: Date
}, {collection: 'registeredUser'});
module.exports = registeredUserSchema;