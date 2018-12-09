const mongoose = require('mongoose');
const usherSchema = mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonModel'
    }
}, {collection: 'usher'});
module.exports = usherSchema;