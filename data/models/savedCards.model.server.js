const mongoose = require('mongoose')
const savedCardsSchema = require('./user.model.server');
module.exports = mongoose.model('SavedModel', savedCardsSchema);