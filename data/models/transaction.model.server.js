const mongoose = require('mongoose')

const transactionSchema = require('./transaction.schema.server')
const transactionModel = mongoose.model('TransactionModel', transactionSchema)

module.exports = transactionModel;