'use strict';

//dependencies:
const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));


//error handlers:
app.get('*', notFoundHandler);
app.use(errorHandler);


function notFoundHandler(req, res) {
  res.status(404).send('huh?');
}

function errorHandler(error, req, res) {
  res.status(500).send(error);
}


//turn on server:
client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  });
