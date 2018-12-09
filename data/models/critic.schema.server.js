const mongoose = require('mongoose');
const usherSchema = mongoose.Schema({
    personId: {
        type: String,
        ref: 'PersonModel'
    }
}, {collection: 'usher'});
module.exports = usherSchema;