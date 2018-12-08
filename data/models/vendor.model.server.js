const mongoose = require('mongoose')
const vendorSchema = require('./vendor.model.server')
module.exports = mongoose.model('RegisteredUserModel', vendorSchema)