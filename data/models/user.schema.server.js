const mongoose = require('mongoose');
const registeredUserSchema = mongoose.Schema({
    dob: String
}, {collection: 'registeredUser'});
module.exports = registeredUserSchema;