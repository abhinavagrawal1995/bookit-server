const mongoose = require('mongoose')
const savedCardsSchema = require('./registeredUser.model.server');
module.exports = mongoose.model('SavedModel', savedCardsSchema);