module.exports = function () {
   const mongoose = require('mongoose');
   const databaseName = 'moviedb';
   var connectionString =
      'mongodb://admin:admin123@ds115244.mlab.com:15244';
   connectionString += databaseName;
   mongoose.connect(connectionString, {
      useNewUrlParser: true
   });
};