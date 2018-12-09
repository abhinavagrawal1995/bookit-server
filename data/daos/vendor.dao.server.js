const vendorModel = require('../models/vendor.model.server')

// truncateDatabase = () => {
//     return Promise.all([userModel.deleteMany({})
//     ])
// }

createVendor = vendor => vendorModel.create(vendor);

findAllVendor = () => vendorModel.find();

findVendorById = personId => vendorModel.findById(personId);

updateVendorTheatre = (personId, theatreName) =>
    vendorModel.update({personId: personId}, {$set: {theatreName:theatreName}});

module.exports = {
    createVendor, findAllVendor, findVendorById,updateVendorTheatre
}