const bookingModel = require('../models/booking.model.server')

createBooking = (userId, showId) => bookingModel.create(userId, showId)

findAllBookings = () => bookingModel.find()

findBookingById = userId => bookingModel.findById(userId)


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