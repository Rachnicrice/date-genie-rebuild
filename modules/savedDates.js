'use strict';

require('dotenv').config();
const error = require('./error.js');
const client = require('./client.js');

console.log('In savedDates');

function addToSavedDates(req, res) {
  let { restaurant, budget, link_url, img_url, rating, phone } = req.body;
  let SQL = 'INSERT INTO saved_dates (restaurant, budget, link_url, img_url, rating, phone ) VALUES ($1, $2, $3, $4, $5);';
  let safeValues = [restaurant, budget, link_url, img_url, rating, phone];

  return client.query(SQL, safeValues)
    .then(results => {
      console.log(results.rows);
      res.redirect('/');
    })
    .catch((err) => {
      error(err, res);
    });
}

module.exports = addToSavedDates;
