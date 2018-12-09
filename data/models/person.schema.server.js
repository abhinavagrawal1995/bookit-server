const mongoose = require('mongoose');
const VendorSchema = require('./vendor.schema.server')
const AdminSchema = require('./admin.schema.server')
const CriticSchema = require('./critic.schema.server')
const UserSchema = require('./user.schema.server')
const personSchema = mongoose.Schema({
    username: {type: String, required:true},
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    phone: Number,
    vendor: VendorSchema,
    admin: AdminSchema,
    critic: CriticSchema,
    user: UserSchema
}, {collection: 'person'});
module.exports = personSchema;