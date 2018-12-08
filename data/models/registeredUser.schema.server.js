const mongoose = require('mongoose');
const registeredUserSchema = mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonModel'
    },
    dob: Date
}, {collection: 'registeredUser'});
module.exports = registeredUserSchema;