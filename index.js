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

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.post('/user/register', bodyParser.json(), (req, res) => {
    userInfo = req.body;
    username = userInfo["username"];
    firstName = userInfo["firstName"];
    lastName = userInfo["lastName"];
    password = userInfo["password"];
    phone = userInfo["phone"];
    dob = userInfo["dob"];
    theatreName = userInfo["theatreName"];
    role = userInfo["role"];
    user = {
        dob: dob
    }

    vendor = {
        theatreName: theatreName
    }
    person = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        role: role,
        user: user,
        vendor: vendor
    }

    query = personDao.findPersonByUsername(username);
    query.then(persons => {
        if (persons.length > 0) {
            res.status(401);
            res.send("Username already exists.");
        } else {
            personDao.createPerson(person)
                .then(created => {
                    res.send("Success");
                }).catch(err => {
                res.status(401);
                res.send("Please enter valid fields.")
            })
        }
    });
    query.exec()
});

app.post('/user/login', bodyParser.json(), (req, res) => {
    userInfo = req.body;
    username = userInfo["username"];
    password = userInfo["password"];
    query = personDao.findPersonByCredentials(username, password).then(
        (person) => {
            if (person.length > 0) {
                res.json(person)
                    .catch(err => {
                        res.status(401);
                        res.send("Please enter valid fields.")
                    })
            } else {
                res.status(401);
                res.send("Invalid credentials!");
            }
        }
    );
});

app.post('/user/update', bodyParser.json(), (req, res) => {
        userInfo = req.body;
        _id = userInfo["_id"];
        username = userInfo["username"];
        firstName = userInfo["firstName"];
        lastName = userInfo["lastName"];
        password = userInfo["password"];
        phone = userInfo["phone"];
        dob = userInfo["user"]["dob"];
        theatreName = userInfo["vendor"]["theatreName"];
        role = userInfo["role"];
        user = {
            dob: dob
        };

        vendor = {
            theatreName: theatreName
        };
        person = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            role: role,
            user: user,
            vendor: vendor
        }
        personDao.updatePerson(person)
            .then(updated =>
                res.json(updated))
            .catch(err => {
                res.status(401);
                res.send("Could not update user.")
            })
    }
)

app.get('/user/all', bodyParser.json(), (req, res) => {
    personDao.findAllPerson().then(
        (persons) => {
            res.json(persons);
        }
    )
});


app.post('/user/remove', bodyParser.json(), (req, res) => {
    userInfo = req.body;
    _id = userInfo['_id'];
    personDao.deletePerson(_id).then(
        () => {
            res.send("Success");
        }
    )
});

app.post('/movie/add', bodyParser.json(), (req, res) => {
    movieInfo = req.body;
    imdbID = movieInfo["imdbID"];
    Title = movieInfo["Title"];
    Year = movieInfo["Year"];
    imdbRating = movieInfo["imdbRating"];
    Poster = movieInfo["Poster"];
    Plot = movieInfo["Plot"];
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
                Poster: Poster,
                Plot: Plot
            }
            movieDao.createMovie(newMovie)
                .then(created => {
                    res.send("Success")
                        .catch(err => {
                            res.status(401);
                            res.send("Please enter valid fields.")
                        })

                })
        }
    });

    query.exec()
});

app.get('/movie/summary', bodyParser.json(), (req, res) => {
    movieDao.findAllMovie().then(
        (movies) => {
            res.json(movies);
        }
    )
});

app.post('/movie/delete', bodyParser.json(), (req, res) => {
    movieInfo = req.body;
    imdbID = movieInfo["imdbID"];
    movieDao.deleteMovie(imdbID).then(
        () => {
            res.send("Success")
                .catch(err => {
                    res.status(401);
                    res.send("Please enter valid movie.")
                });
        }
    )
});


app.post('/show/add', bodyParser.json(), (req, res) => {
    showInfo = req.body;
    theatreName = req.body['vendor']['theatreName'];
    imdbID = req.body['movie']['imdbID'];
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
    showInfo = req.body;
    imdbID = req.body['movie']['imdbID'];
    showDao.findShowByMovie(imdbID).then(
        (shows) => {
            res.json(shows);
        }
    )
});

app.post('/show/remove', bodyParser.json(), (req, res) => {
    showInfo = req.body;
    imdbID = req.body['movie']['imdbID'];
    theatreName = req.body['vendor']['theatreName'];
    date = showInfo["date"];
    time = showInfo["time"];
    showDao.deleteShowByMovie(imdbID, theatreName, date, time).then(
        () => {
            res.send("Success");
        }
    )
});

app.post('/booking/create', bodyParser.json(), (req, res) => {
    bookingInfo = req.body;
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
    bookingInfo = req.body;

    userId = bookingInfo['user']['personId'];
    bookingDao.findBookingByUser(userId).then(
        (shows) => {
            res.json(shows);
        }
    )
});

app.get('/booking/find', (req, res) => {
    bookingInfo = req.body;
    _id = bookingInfo['id'];
    bookingDao.findBookingById(_id).then(
        (shows) => {
            res.json(shows);
        }
    )
});

app.post('/booking/remove', bodyParser.json(), (req, res) => {
    bookingInfo = req.body;
    _id = bookingInfo['id'];
    bookingDao.deleteBookingById(_id).then(
        () => {
            res.send("Success");
        }
    )
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));