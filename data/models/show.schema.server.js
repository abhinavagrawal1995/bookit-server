const mongoose = require('mongoose');
const showSchema = mongoose.Schema({
    imdbID:{
        type: String,
        ref: 'MovieModel'
    },
    // theatreName: {
    //     type: String,
    //     ref: 'VendorModel'
    // },
    personId: {
        type: String,
        ref: 'PersonModel'
    },
    date: String,
    time: String,
    price: String
}, {collection: 'shows'});
module.exports = showSchema;