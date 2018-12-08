const registeredUserModel = require('../models/registeredUser.model.server')


createRegisteredUser = registeredUser => registeredUserModel.create(registeredUser);

findAllRegisteredUser = () => registeredUserModel.find();

findRegisteredUserById = personId => registeredUserModel.findById(personId);


module.exports = {
    createRegisteredUser,findAllRegisteredUser,findRegisteredUserById
}