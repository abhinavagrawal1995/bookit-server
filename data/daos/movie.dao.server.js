const movieModel = require('../models/movie.model.server');

createMovie = movie => movieModel.create(movie);

findMovieById = imdbId => movieModel.find({imdbID:imdbId});

findAllMovie = () => movieModel.find();

deleteMovie = imdbID =>
    movieModel.remove({imdbID: imdbID});

module.exports = {
    createMovie,
    findMovieById,
    findAllMovie,
    deleteMovie
};