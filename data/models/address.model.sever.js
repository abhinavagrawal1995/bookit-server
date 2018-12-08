const mongoose = require('mongoose')
const addressSchema = require('./address.schema.server')
module.exports = mongoose.model('AddressModel', addressSchema)