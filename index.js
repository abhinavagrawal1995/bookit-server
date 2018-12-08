const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const personDao = require('./data/daos/person.dao.server');

const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())


app.get('/', (req, res) => res.send('Hello World!'))



app.post('/register', bodyParser.json(), (req, res) => {
    userInfo = req.query;
    username = userInfo["username"];
    result = personDao.findPersonByUsername(username)
    if (result.length > 0) {
        res.status(401);
        res.send("Username already exists.");
    } else {
        res.send("Success");
    }
});

app.post('/login', (req, res) => {
    userInfo = req.body;
    username = userInfo["username"];
    password = userInfo["password"];
    result = personDao.findPersonByCredentials(username, password).then(
        (users) => {
            if (users.length > 0) {
                res.send("Retry login with valid credentials!");
            } else {
                res.status(401);
                res.send("Unauthorized.");

            }
        }
    );
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))