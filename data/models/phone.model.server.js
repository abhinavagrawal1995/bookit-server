const mongoose = require('mongoose')
const phoneSchema = require('./phone.schema.server')
module.exports = mongoose.model('PhoneModel', phoneSchema)