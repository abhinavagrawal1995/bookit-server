const phoneModel = require('../models/phone.model.server')

createPhone = phone => phoneModel.create(phone)

findPhoneById = personId => phoneModel.findById(personId)



module.exports = {
    createPhone,findPhoneById
}