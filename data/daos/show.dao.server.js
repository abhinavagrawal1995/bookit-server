const showModel = require('../models/show.model.server')
const personModel = require('../models/person.model.server');
const personDao = require('./person.dao.server');


addShow = show => showModel.create(show)

findAllShows = () => showModel.find()

findShowById = showId => showModel.findById(showId)

findShowBySchedule = date => showModel.find({date: date})

findShowByMovie = imdbID => showModel.find({imdbID: imdbID});


findShowByVendor = personId =>
    showModel.find({personId: personId});


deleteShowByMovie = (imdbID, personId, date, time) => showModel.remove({
    imdbID: imdbID,
    personId: personId,
    date: date,
    time: time
});


module.exports = {
    addShow, findAllShows, findShowById, findShowBySchedule, findShowByMovie, deleteShowByMovie, findShowByVendor

}