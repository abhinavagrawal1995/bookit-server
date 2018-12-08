const vendorRatingModel = require('../models/transaction.model.server')

addVendorRating = vendorRating => vendorRatingModel.create(vendorRating)

findVendorRatingByVendorId = (vendorId) => vendorRatingModel.findById(vendorId)

// deleteUser = userId => userModel.remove({
//     _id: userId
// })

module.exports = {
    addVendorRating,
    findVendorRatingByVendorId
}