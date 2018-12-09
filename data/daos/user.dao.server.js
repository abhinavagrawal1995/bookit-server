const registeredUserModel = require('../models/user.model.server')
const personModel = require('../models/person.model.server')

createUser = registeredUser => {
    person = {
        username: registeredUser["username"],
        password: registeredUser["password"],
        firstName: registeredUser["firstName"],
        lastName: registeredUser["lastName"],
        role: registeredUser["role"]
    };
    return personModel.create(person).then(

        res => {
            newUser = {
                dob: registeredUser["dob"]
            }
            return registeredUserModel.create(newUser);
        }
    );
    // registeredUserModel.create({person: });
}

findAllRegisteredUser = () => registeredUserModel.find();

findRegisteredUserById = personId => registeredUserModel.findById(personId);

updateRegisteredUserDob = (personId, dob) =>
    registeredUserModel.update({personId: personId}, {$set: {dob:dob}});

module.exports = {
    createUser, findAllRegisteredUser, findRegisteredUserById, updateRegisteredUserDob
}