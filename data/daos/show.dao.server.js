const showModel = require('../models/show.model.server')

addShow = show => bookingModel.create(show)

findAllShows = () => bookingModel.find()

findShowById = showId => bookingModel.findById(showId)

findShowBySchedule = date => bookingModel.find(date)

findShowByVendorId = vendorId => bookingModel.findById(vendorId)

// deleteUser = userId => userModel.remove({
//     _id: userId
// })