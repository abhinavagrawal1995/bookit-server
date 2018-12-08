const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    movieName: {type: String, required:true},
    imdbId: String,
    thumbnail: String,
    genre: [{
        type: String
    }]
}, {collection: 'movie'});
module.exports = movieSchema;