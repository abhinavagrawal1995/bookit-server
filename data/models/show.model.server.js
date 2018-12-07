const mongoose = require('mongoose')

const showSchema = require('./show.schema.server')
const showModel = mongoose.model('ShowModel', showSchema)

module.exports = showModel;