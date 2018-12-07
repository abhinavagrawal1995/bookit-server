module.exports = function () {
   const mongoose = require('mongoose');
   const databaseName = 'bookit';
   var connectionString =
      'mongodb://localhost/';
   connectionString += databaseName;
   mongoose.connect(connectionString, {
      useNewUrlParser: true
   });
};