const transactionModel = require('../models/transaction.model.server')

createTransaction = transaction => transactionModel.create(transaction)

findAllTransactions = () => transactionModel.find()

findTransactionsByUserId = userId => transactionModel.findById(userId)

findTransactionByTransactionId = (userId, transactionId) => transactionModel.findById({userId: userId, transactionId: transactionId})

module.exports = {
    createTransaction,
    findAllTransactions,
    findTransactionsByUserId,
    findTransactionByTransactionId,
}