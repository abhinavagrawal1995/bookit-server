const showModel = require('../models/show.model.server')

addShow = show => showModel.create(show)

findAllShows = () => showModel.find()

findShowById = showId => showModel.findById({showId:showId})

findShowBySchedule = date => showModel.find({date:date})

findShowByMovie = imdbID => showModel.find({imdbID:imdbID});

deleteShowByMovie = (imdbID,theatreName,date,time) => showModel.remove({imdbID:imdbID, theatreName: theatreName,date:date,time:time});

module.exports = {
    addShow, findAllShows, findShowById, findShowBySchedule,findShowByMovie,deleteShowByMovie
}