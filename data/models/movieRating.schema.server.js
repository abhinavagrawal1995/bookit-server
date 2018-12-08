const mongoose = require('mongoose');
const movieRatingSchema = mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieModel'
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonModel'
    },
    rating: Number,
    comment: String
}, {collection: 'movieRating'});
module.exports = movieRatingSchema;