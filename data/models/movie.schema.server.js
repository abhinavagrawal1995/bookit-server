const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    imdbID: String,
    Title: String,
    Year: String,
    imdbRating: String,
    Poster: String,
    Plot: String

}, {collection: 'movie'});
module.exports = movieSchema;