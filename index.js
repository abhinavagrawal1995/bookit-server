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
const bookingModel = require('./data/models/booking.model.server');
const showModel = require('./data/models/show.model.server');
const movieModel = require('./data/models/movie.model.server');
const personModel = require('./data/models/person.model.server');


require('./data/db.js')()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});



app.post('/reset', bodyParser.json(), (req, res) => {
    Promise.all([
        bookingModel.deleteMany({}),
        showModel.deleteMany({}),
        movieModel.deleteMany({}),
        personModel.deleteMany({})
    ]).then(() =>{
        persons=[{
            username : "admin",
            password : "admin",
            firstName : "Admin",
            lastName : "Admin",
            phone : 98976557865,
            role : "admin",
            user : {
                dob: ""
            },
            vendor : {
                theatreName : ""
            },},{
            username : "alice",
            password : "alice",
            firstName : "Alice",
            lastName : "Wonder",
            phone : 98976389865,
            role : "vendor",
            user : {
                dob: ""
            },
            vendor : {
                theatreName : "Regal"
            },},
            {
                username : "bob",
                password : "bob",
                firstName : "Bob",
                lastName : "Hope",
                phone : 9897129865,
                role : "user",
                user : {
                    "dob": "19/121993"
                },
                "vendor" : {
                    "theatreName" : ""
                },},{  "username" : "charlie",
                password : "charlie",
                firstName : "Charlie",
                lastName : "Brown",
                phone : 98971865,
                role : "usher",
                user : {
                    dob: ""
                },
                vendor : {
                    theatreName : ""
                },}];
            movies= [{imdbID: 'tt0372784',Title: 'Batman Begins', Year: '2005', imdbRating: '8.3', Poster: 'https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
                Plot: 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.',},
                ];

            shows = [{
                imdbID: 'tt0372784',
                theatreName: 'Regal',
                date: '27/05',
                time: '12:30',
                price: '9.99',
                id: 'asdasdsad'
            }, {
                imdbID: 'tt0372784',
                theatreName: 'IMAX',
                date: '27/05',
                time: '12:30',
                price: '19.99',
                id: 'asdasdsad'
            }]

            bookings = [{}]


        Promise.all([
            ...persons.map(person => createPerson(person)),
            ...movies.map(movie => createMovie(movie)),
            ...shows.map(show => addShow(show)),
            ...bookings.map(booking => createBooking(booking))
        ]).then(() => {
            res.send("Success")
        });
    }).catch(err=> res.send(err))

})

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
        if (persons.length == 1) {
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
            if (person.length == 1) {
                res.json(person[0])
            } else {
                res.status(401);
                res.send("Invalid credentials!");
            }
        }
    ).catch(err => {
        res.status(401);
        res.send("Please enter valid fields.")
    });
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
    ).catch(err => {
        res.status(401);
        res.send("Error occured!")
    });
});


app.post('/user/remove', bodyParser.json(), (req, res) => {
    userInfo = req.body;
    _id = userInfo['_id'];
    personDao.deletePerson(_id).then(
        () => {
            res.send("Success");
        }
    ).catch(err => {
        res.status(401);
        res.send("User does not exist!")
    });
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


                }).catch(err => {
                res.status(401);
                res.send("Please enter valid fields.")
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
    ).catch(err => {
        res.status(401);
        res.send("Movie does not exist!")
    });
});

app.post('/movie/remove', bodyParser.json(), (req, res) => {
    movieInfo = req.body;
    imdbID = movieInfo["imdbID"];
    movieDao.deleteMovie(imdbID).then(
        () => {
            res.send("Success")

        }
    ).catch(err => {
        res.status(401);
        res.send("Movie does not exist!")
    });
});


app.post('/show/add', bodyParser.json(), (req, res) => {
    showInfo = req.body;
    personId = showInfo['person']['_id'];
    imdbID = showInfo['show']['imdbID'];
    date = showInfo['show']["date"];
    time = showInfo['show']["time"];
    price = showInfo['show']["price"];
    newShow = {
        imdbID: imdbID,
        personId: personId,
        date: date,
        time: time,
        price: price
    };
    showDao.addShow(newShow)
        .then(created => {
            res.send("Success");
        }).catch(err => {
        res.status(401);
        res.send("Adding show operation failed!")
    });
    ;
});


app.get('/show/movie', bodyParser.json(), (req, res) => {
    showInfo = req.query;
    imdbID = showInfo['imdbID'];
    personId = showInfo['person']['_id'];
    personDao.findPersonById(personId)
        .then(foundVendor => {
    movieDao.findMovieById(imdbID).then(foundMovies => {
        showDao.findShowByMovie(imdbID).then(
            (shows) => {
                for (var i = 0; i < shows.length; i++) {
                    shows[i]._doc['movie'] = foundMovies[0]._doc;
                    shows[i]._doc['vendor'] = foundVendor._doc;
                }
                res.json(shows);
            }).catch(err => {
            res.status(401);
            res.send("Show does not exist!")
        });
    })
        }
    )
});







app.get('/show/vendor', bodyParser.json(), (req, res) => {
    vendorInfo = req.query;
    personId = vendorInfo['_id'];
    showDao.findShowByVendor(personId).then((shows) => {
        res.json(shows);
    }).catch(err => {
        res.status(401);
        res.send("Show does not exist!")
    })
});


app.post('/show/remove', bodyParser.json(), (req, res) => {
    showInfo = req.body;
    imdbID = req.body['movie']['imdbID'];
    personId = showInfo['person']['_id'];
    date = showInfo["date"];
    time = showInfo["time"];
    showDao.deleteShowByMovie(imdbID, personId, date, time).then(
        () => {
            res.send("Success");
        }
    ).catch(err => {
        res.status(401);
        res.send("Show does not exist!")
    });
});

app.post('/booking/create', bodyParser.json(), (req, res) => {
    bookingInfo = req.body;
    userId = bookingInfo['user']['_id'];
    showId = bookingInfo['show']['_id'];
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

        }).catch(err => {
        res.status(401);
        res.send("Booking failed!")
    });
    ;
});

app.get('/booking/user', bodyParser.json(), (req, res) => {
    bookingInfo = req.query;

    username = bookingInfo['username'];
    userId = bookingInfo['userid'];
    showId = bookingInfo['showId'];
    personDao.findPersonByUsername(username).then(foundUsers => {
        showDao.findShowById(showId).then(foundShow => {
            bookingDao.findBookingByUser(userId).then(
                (bookings) => {
                    for (var i = 0; i < bookings.length; i++) {
                        bookings[i]._doc['user'] = foundUsers[0]._doc;
                        bookings[i]._doc['show'] = foundShow._doc;
                    }
                    res.json(bookings);
                }).catch(err => {
                res.status(401);
                res.send("User or Booking does not exist!")
            });
        })
    })
});

app.get('/booking/find', bodyParser.json(), (req, res) => {
    bookingInfo = req.query;
    _id = bookingInfo['_id'];
    username = bookingInfo['username'];
    showId = bookingInfo['showId'];
    personDao.findPersonByUsername(username).then(foundUsers => {
        showDao.findShowById(showId).then(foundShow => {
            bookingDao.findBookingById(_id).then(
                (booking) => {
                    booking._doc['user'] = foundUsers[0]._doc;
                    booking._doc['show'] = foundShow._doc;
                    res.json(booking);
                }).catch(err => {
                res.status(401);
                res.send("User or Booking does not exist!")
            });
        })
    });
});


app.post('/booking/remove', bodyParser.json(), (req, res) => {
    bookingInfo = req.body;
    _id = bookingInfo['_id'];
    bookingDao.deleteBookingById(_id).then(
        () => {
            res.send("Success");
        }
    ).catch(err => {
        res.status(401);
        res.send("Booking does not exist!")
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));