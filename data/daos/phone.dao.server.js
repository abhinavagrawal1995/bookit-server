const phoneModel = require('../models/phone.model.server')

createPhone = phone => phoneModel.create(phone)

findPhoneById = personId => phoneModel.findById(personId)

updatePhone = (personId, phone) =>
    phoneModel.update({personId: personId}, {$set: {phone:phone}});

module.exports = {
    createPhone,findPhoneById,updatePhone
}