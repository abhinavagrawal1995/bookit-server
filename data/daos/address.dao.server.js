const addressModel = require('../models/address.model.server');

createAddress = address => addressModel.create(address);

findAddressById = personId => addressModel.findById(personId);

module.exports = {
    createAddress,findAddressById
}