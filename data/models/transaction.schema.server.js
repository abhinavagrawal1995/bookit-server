const mongoose = require('mongoose');
const showSchema = mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookingModel'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    status: Boolean,
    total: Number,
    is_complete: Boolean
}, {collection: 'transactions'});
module.exports = transactionSchema;