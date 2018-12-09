const mongoose = require('mongoose')
const registeredUserSchema = require('./user.model.server')
module.exports = mongoose.model('RegisteredUserModel', registeredUserSchema)