const userModel = require('../models/user.model.server')

truncateDatabase = () => {
    return Promise.all([userModel.deleteMany({})
    ])
}

createUser = user => userModel.create(user)

findAllUsers = () => userModel.find()

findUserById = userId => userModel.findById(userId)


deleteUser = userId => userModel.remove({
    _id: userId
})

populateDatabase = () => {
    var inserts = [];
    var alice = {
        _id: 123,
        username: 'alice',
        password: 'alice',
        firstName: 'Alice',
        lastName: 'Wonderland',
        userType: 'Student',
        student: {
            gradYear: 2020,
            scholarship: 15000
        }
    }
    inserts.push(createUser(alice))

    return Promise.all(inserts);
}

module.exports = {
    truncateDatabase,
    populateDatabase,
    createUser,
    deleteUser,
    findAllUsers,
    findUserById,
}