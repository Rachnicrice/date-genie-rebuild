'use strict';

//dependencies:
const express = require('express');
require('dotenv').config();
const methodOverride = require('method-override');
const client = require('./modules/client.js');
require('ejs');

const app = express();
const PORT = process.env.PORT || 3001;



//import modules:
const handleLocation = require('./modules/location');
const error = require('./modules/error.js');
const addToSavedDates = require('./modules/savedDates.js');
// const handleMovies = require('./modules/movie.js');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

//routes
app.get('/', (req, res) => {
  res.render('pages/index');
});
app.get('/search', handleSearch);
app.post('/searchResults', handleLocation);
app.post('/user', renderUser);
app.get('/todos', renderTodos);
app.get('/newAccount', handleNew);
app.post('/addUser', addUser);
app.post('/', addToSavedDates);
// app.get('/getMovies', handleMovies);

//error handlers:
app.get('*', notFoundHandler);
app.use(error);

function notFoundHandler(req, res) {
  res.status(404).send('huh?');
}

//Page rendering functions
function handleSearch(req, res) {
  res.render('pages/search');
}
function handleNew(req, res) {
  res.render('pages/newAccount');
}

function renderTodos(req, res) {
  //Retrieve saved to-dos for user from database
}

function list (req, res) {
  res.render('pages/todo');
}

//Function to check if user exists in database
function renderUser(req, res) {
  let SQL = `SELECT * FROM users WHERE username=$1`;
  let safeValues = [req.body.username];

  client.query(SQL, safeValues)
    .then(results => {
      if (results.rowCount > 0) {
        console.log(results);
        //get row id
        //use id to query database for saved dates
        //render the saved dates to home route
      } else {
        res.redirect('/newAccount');
      }
    });
}

//Add new user to database
function addUser(req, res) {
  let { username, password, kids, location } = req.body;
  let SQL = `INSERT INTO users (username, password, kids, location) VALUES ($1, $2, $3, $4) RETURNING *`;
  let safeValues = [username, password, kids, location];

  client.query(SQL, safeValues)
    .then(() => {
      res.redirect('/');
    });
}



//turn on server:
client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  });
