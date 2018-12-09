const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const personDao = require('./data/daos/person.dao.server');
const userDao = require('./data/daos/user.dao.server');
const vendorDao = require('./data/daos/user.dao.server');
const phoneDao = require('./data/daos/phone.dao.server');
const addressDao = require('./data/daos/address.dao.server');
const movieDao = require('./data/daos/movie.dao.server');
const showDao = require('./data/daos/show.dao.server');
const bookingDao = require('./data/daos/booking.dao.server');

require('./data/db.js')()
const cors = require('cors')
const bodyParser = require('body-parser')

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.post('user/register', bodyParser.json(), (req, res) => {
    userInfo = req.query;
    username = userInfo["username"];
    firstName = userInfo["firstName"];
    lastName = userInfo["lastName"];
    password = userInfo["password"];
    dob = userInfo["dob"];
    query = personDao.findPersonByUsername(username);
    query.then(persons => {
        if (persons.length > 0) {
            res.status(401);
            res.send("Username already exists.");
        } else {
            userDao.createUser(userInfo)
                .then(created => {
                    res.send("Success");
                })
        }
    })
    query.exec()
});

app.post('user/login', (req, res) => {
    userInfo = req.query;
    username = userInfo["username"];
    password = userInfo["password"];
    query = personDao.findPersonByCredentials(username, password).then(
        (users) => {
            if (users.length > 0) {
                res.send("Login Successful!");
            } else {
                res.status(401);
                res.send("Retry login with valid credentials!");
            }
        }
    );
});

app.post('/updateuser', bodyParser.json(), (req, res) => {
        userInfo = req.query;
        username = userInfo["username"];
        firstName = userInfo["firstName"];
        lastName = userInfo["lastName"];
        address1 = userInfo["address1"];
        address2 = userInfo["address2"];
        city = userInfo["city"];
        state = userInfo["state"];
        zip = userInfo["zip"];
        phone = userInfo["phone"];
        role = userInfo["role"];
        promises = []
        if (role == "user") {
            dob = userInfo["dob"];
            personDao.findPersonByUsername(username).then(
                (user) => {
                    personId = user._id
                    userDao.updateUserDob(personId, dob);
                    res.send("Login Successful!");
                }
            )
        } else if (role == "vendor") {
            theatreName = userInfo["theatreName"];
            personDao.findPersonByUsername(username).then(
                (user) => {
                    personId = user._id;
                    vendorDao.updateVendorTheatre(personId, theatreName);
                    res.send("Login Successful!");
                }
            )
        }
        updatedPerson = {
            firstName: "firstName",
            lastName: "lastName"
        }
        updatedAddress = {
            address1: "address1",
            address2: "address2",
            city: "city",
            state: "state",
            zip: "zip"
        }

        personDao.findPersonByUsername(username).then(
            (user) => {
                personId = user._id;
                personDao.updatePerson(personId, updatedPerson);
                phoneDao.updatePhone(personId, phone);
                addressDao.updateAddress(personId, updatedAddress);
                res.send("Update person Successful!");
            }
        )

        query = personDao.findPersonByUsername(username);
    }
)

app.post('/movie/add', bodyParser.json(), (req, res) => {
    movieInfo = req.query;
    imdbID = movieInfo["imdbID"];
    Title = movieInfo["Title"];
    Year = movieInfo["Year"];
    imdbRating = movieInfo["imdbRating"];
    Poster = movieInfo["Poster"];
    query = movieDao.findMovieById(imdbID);
    query.then(movie => {
        if (movie.length > 0) {
            res.status(401);
            res.send("Movie already exists.");
        } else {
            newMovie = {
                imdbID: imdbID,
                Title: Title,
                Year: Year,
                imdbRating: imdbRating,
                Poster: Poster
            }
            movieDao.createMovie(newMovie)
                .then(created => {
                    res.send("Success");

                })
        }
    });

    query.exec()
});

app.get('/movie/summary', (req, res) => {
    movieDao.findAllMovie().then(
        (movies) => {

            res.json(movies);
        }
    )
});

app.post('/movie/delete', (req, res) => {
    movieInfo = req.query;
    imdbID = movieInfo["imdbID"];
    movieDao.deleteMovie(imdbID).then(
        () => {
            res.send("Success");
        }
    )
});


app.post('/show/add', bodyParser.json(), (req, res) => {
    showInfo = req.query;
    theatreName = req.query['vendor']['theatreName'];
    imdbID = req.query['movie']['imdbID'];
    date = showInfo["date"];
    time = showInfo["time"];
    price = showInfo["price"];
    newShow = {
        imdbID: imdbID,
        theatreName: theatreName,
        date: date,
        time: time,
        price: price
    };
    showDao.addShow(newShow)
        .then(created => {
            res.send("Success");
        });
});

//getshowbyvendorId

app.get('/show/movie', (req, res) => {
    showInfo = req.query;
    imdbID = req.query['movie']['imdbID'];
    showDao.findShowByMovie(imdbID).then(
        (shows) => {
            res.json(shows);
        }
    )
});

app.post('/show/remove', (req, res) => {
    showInfo = req.query;
    imdbID = req.query['movie']['imdbID'];
    theatreName = req.query['vendor']['theatreName'];
    date = showInfo["date"];
    time = showInfo["time"];
    showDao.deleteShowByMovie(imdbID, theatreName, date, time).then(
        () => {
            res.send("Success");
        }
    )
});

app.post('/booking/create', bodyParser.json(), (req, res) => {
    bookingInfo = req.query;
    userId = bookingInfo['user']['id'];
    showId = bookingInfo['shows']['id'];
    seats = bookingInfo["seats"];
    amountPaid = bookingInfo["amountPaid"];

    newBooking = {
        userId: userId,
        showId: showId,
        seats: seats,
        amountPaid: amountPaid,
    };
    bookingDao.createBooking(newBooking)
        .then(created => {
            res.send("Success");

        });
});

app.get('/booking/user', (req, res) => {
    bookingInfo = req.query;

    userId = bookingInfo['user']['personId'];
    bookingDao.findBookingByUser(userId).then(
        (shows) => {
            res.json(shows);
        }
    )
});

app.get('/booking/find', (req, res) => {
    bookingInfo = req.query;
    _id = bookingInfo['id'];
    bookingDao.findBookingById(_id).then(
        (shows) => {
            res.json(shows);
        }
    )
});

app.post('/booking/remove', (req, res) => {
    bookingInfo = req.query;
    _id = bookingInfo['id'];
    bookingDao.deleteBookingById(_id).then(
        () => {
            res.send("Success");
        }
    )
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));