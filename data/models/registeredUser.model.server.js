const mongoose = require('mongoose')
const registeredUserSchema = require('./registeredUser.model.server')
module.exports = mongoose.model('RegisteredUserModel', registeredUserSchema)