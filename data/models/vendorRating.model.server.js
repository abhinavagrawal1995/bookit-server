const mongoose = require('mongoose')

const vendorRatingSchema = require('./vendorRating.schema.server')
const vendorRatingModel = mongoose.model('VendorRatingModel', vendorRatingSchema)

module.exports = vendorRatingModel;