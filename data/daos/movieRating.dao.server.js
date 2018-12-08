const movieRatingModel = require('../models/movieRating.model.server');

createMovieRating = movieRating => movieRatingModel.create(movieRating);

findMovieRatingByMovieId = imdbId => movieRatingModel.findById(imdbId);

module.exports = {
    createMovieRating,
    findMovieRatingByMovieId
};