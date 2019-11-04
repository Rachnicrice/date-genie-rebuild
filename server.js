'use strict';

//dependencies:
const express = require('express');
require('dotenv').config();
const methodOverride = require('method-override');
const client = require('./modules/client.js');

const app = express();
const PORT = process.env.PORT || 3001;


//import modules:
const handleLocation = require('./modules/location');
const error = require('./modules/error.js');

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
  res.send('I exist!');
});


//error handlers:
app.get('*', notFoundHandler);
app.use(error);

//routes:
app.get('/location', handleLocation);

function notFoundHandler(req, res) {
  res.status(404).send('huh?');
}

//turn on server:
client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  });
