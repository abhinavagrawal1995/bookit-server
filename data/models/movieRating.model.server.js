const mongoose = require('mongoose')
const addressSchema = require('./movieRating.schema.server')
module.exports = mongoose.model('MovieModel', addressSchema)