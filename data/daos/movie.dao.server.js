const movieModel = require('../models/movie.model.server');

createMovie = movie => movieModel.create(movie);

findMovieById = imdbId => movieModel.findById(imdbId);


module.exports = {
    createMovie,
    findMovieById
};