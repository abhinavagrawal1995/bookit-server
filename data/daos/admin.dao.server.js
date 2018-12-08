const adminModel = require('../models/admin.model.server');

createAdmin = admin => adminModel.create(admin);

findAdminById = personId => adminModel.findById(personId);

module.exports = {
    createAdmin,findAdminById
};