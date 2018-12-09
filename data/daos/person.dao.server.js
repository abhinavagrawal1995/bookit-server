const personModel = require('../models/person.model.server');


createPerson = person => personModel.create(person);

findAllPerson = () => personModel.find();

findByRole = (role) => personModel.find({role:role});

findPersonById = personId => personModel.findById(personId);

findPersonByUsername = username => personModel.find({username:username});

findPersonByCredentials = (username,password) =>
    personModel.find({username:username,password:password});

updatePerson = (personId, person) =>
    personModel.update({_id: personId}, {$set: person});

deletePerson = (personId) => personModel.remove({_id: personId});


module.exports = {
    createPerson,findAllPerson,findPersonById, findPersonByCredentials,findPersonByUsername,findByRole
};