const registeredUserModel = require('../models/user.model.server')
const personModel = require('../models/person.model.server')

createRegisteredUser = registeredUser => {
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
                personId: res._doc._id,
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
    createRegisteredUser, findAllRegisteredUser, findRegisteredUserById, updateRegisteredUserDob
}