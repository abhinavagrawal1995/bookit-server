const mongoose = require('mongoose')
const usherSchema = require('./usher.schema.server')
module.exports = mongoose.model('UsherModel', usherSchema)