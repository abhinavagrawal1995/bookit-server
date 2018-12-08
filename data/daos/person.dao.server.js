const personModel = require('../models/person.model.server');


createPerson = person => personModel.create(person);

findAllPerson = () => personModel.find();

findPersonById = personId => personModel.findById(personId);

findPersonByUsername = username => personModel.find({username:username});

findPersonByCredentials = (username,password) => personModel.find({username:username,password:password});


module.exports = {
    createPerson,findAllPerson,findPersonById, findPersonByCredentials,findPersonByUsername
};