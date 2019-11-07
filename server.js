/* eslint-disable comma-dangle */
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
// const handleMovies = require('./modules/movie.js');

app.use(express.urlencoded({ extended: true, }));
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
  res.render('pages/index', {datesArray: 0, id: false});
});
app.get('/:id/search', handleSearch);
app.post('/:id/searchResults', handleLocation);
app.post('/user', lookupUser);
app.get('/user/:id', renderHome);
app.get('/newAccount', handleNew);
app.post('/addUser', addUser);
app.post('/:id/makeDate', addNewDate);
app.post('/:id/editDate', editExistingDate);
app.post('/:id/editADate', editDate);
app.get('/todo/:id', list);
app.post('/:id/deleteDate', deleteDate);
app.get('/:id/aboutYourGenies', meetGenies);

//error handlers:
app.get('*', notFoundHandler);
app.use(error);

function notFoundHandler(req, res) {
  res.status(404).send('huh?');
}

//Page rendering functions
function handleSearch (req, res) {
  let id = req.params.id;
  res.render('pages/search', {id:id});
}
function handleNew(req, res) {
  res.render('pages/newAccount', {id:true});
}

function meetGenies (req, res) {
  let id = req.params.id;
  res.render('pages/aboutUs', {id:id});
}

function list( req, res) {
  let id = req.params.id;
  res.render('pages/todo', {id:id});
}

//Grab the user's saved dates info from the database and pass it to the home page to render
function renderHome (req, res) {
  let id = [req.params.id];
  let SQL = `SELECT * FROM saved_dates WHERE user_is=$1`;

  client.query(SQL, id)
    .then (results => {
      let savedDates = results.rows;
      res.status(200).render('pages/index', {datesArray: savedDates, id:id});
    })
    .catch(err => error(err, res));
}

//Function to check if user exists in database
function lookupUser (req, res) {
  let SQL = `SELECT * FROM users WHERE username=$1`;
  let safeValues = [req.body.username];

  client.query(SQL, safeValues)
    .then(results => {
      if (results.rowCount > 0) {
        //get row id
        let safeValue = [results.rows[0].id];
        res.redirect(`/user/${safeValue}`);
      } else {
        res.redirect('/newAccount');
      }
    })
    .catch(err => error(err, res));
}

//From the search results add a resturant to the saved_dates table in the database
function addNewDate (req, res) {
  let id = req.params.id;
  let { restaurant, rating, budget, img_url, address, phone, link_url } = req.body;

  let SQL = 'INSERT INTO saved_dates (user_is, restaurant, budget, link_url, img_url, rating, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
  let safeValues = [id, restaurant, budget, link_url, img_url, parseInt(rating), address, phone];

  return client.query(SQL, safeValues)
    .then ( results => {
      console.log(results.rows[0])
      res.render('pages/makeADate', {date:results.rows[0], id:id});
      res.redirect(`/${id}/editADate`);
    })
    .catch(error => {
      Error(error, res);
    });
}

function editDate (req, res) {
  let user = req.params.id;
  let { id, restaurant, rating, budget, img_url, address, phone, link_url } = req.body;

  let SQL = `UPDATE saved_dates SET restaurant=$1, budget=$2, link_url=$3, img_url=$4, rating=$5, address=$6, phone=$7 WHERE id=$8;`;
  let safeValues = [restaurant, budget, link_url, img_url, parseInt(rating), address, phone, id];

  client.query(SQL, safeValues)
    .then( () => {
      console.log('updated database')
      res.redirect(`/user/${user}`)
    })
    .catch(error => {
      Error(error, res);
    });
}

function editExistingDate (req, res) {
  let user = req.params.id;
  let { id } = req.body;

  let SQL = `SELECT * FROM saved_dates WHERE id=$1;`;
  let safeValue = [id];

  client.query(SQL, safeValue)
    .then( results => {
      res.render('pages/makeADate', {date:results.rows[0], id:user});
      res.redirect(`/${id}/editADate`);
    })
}

//Add new user to database
function addUser(req, res) {
  let { username, password, kids } = req.body;
  let SQL = `INSERT INTO users (username, password, kids) VALUES ($1, $2, $3) RETURNING *`;

  if (kids === 'false') {
    kids = false;
  } else {
    kids = true;
  }

  let safeValues = [username, password, kids];

  console.log(safeValues)

  client.query(SQL, safeValues)
    .then( results => {
      res.redirect(`/user/${results.rows[0].id}`);
    })
    .catch(error => {
      Error(error, res);
    });
}

function deleteDate (req, res) {
  let user = req.params.id;
  let { id } = req.body;

  let SQL = `DELETE FROM saved_dates WHERE id=$1`
  let safeValue = [id];

  client.query(SQL, safeValue)
    .then ( () => {
      res.redirect(`/user/${user}`)
    })
    .catch(error => {
      Error(error, res);
    });
}

//turn on server:
client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  });
