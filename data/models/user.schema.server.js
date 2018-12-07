const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
   _id: Number,
   username: String,
   password: String,
   firstName: String,
   lastName: String,
   userType: String,
  
}, {
   collection: 'users'
});
module.exports = userSchema;