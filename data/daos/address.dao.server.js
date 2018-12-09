const addressModel = require('../models/address.model.server');

createAddress = address => addressModel.create(address);

findAddressById = personId => addressModel.findById(personId);

updateAddress = (personId, address) =>
    addressModel.update({personId: personId}, {$set: address});

module.exports = {
    createAddress,findAddressById, updateAddress
}