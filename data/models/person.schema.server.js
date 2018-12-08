const mongoose = require('mongoose');
const personSchema = mongoose.Schema({
    username: {type: String, required:true},
    password: String,
    firstName: String,
    lastName: String
}, {collection: 'person'});
module.exports = personSchema;