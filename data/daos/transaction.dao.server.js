const transactionModel = require('../models/transaction.model.server')

createTransaction = transaction => transactionModel.create(transaction)

findAllTransactions = () => transactionModel.find()

findTransactionsByUserId = userId => transactionModel.findById(userId)

findTransactionByTransactionId = transactionId => transactionModel.findById(transactionId)