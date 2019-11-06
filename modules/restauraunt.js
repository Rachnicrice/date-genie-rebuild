'use strict';

const superagent = require('superagent');
require('dotenv').config();

function handleYelp(req, res, locationObj) {
  const url = `https://api.yelp.com/v3/businesses/search?location=${locationObj.city}`;

  superagent.get(url).set(`Authorization`, `Bearer ${process.env.YELP_API_KEY}`)
    .then(resultsFromAPI => {
      //Creating an array yelp businesses and returning data to the webpage
      console.log(resultsFromAPI);
      const yelpData = resultsFromAPI.body.businesses.map(restaurants => {
        return new Restaurant(restaurants);
      });
      res.status(200).render('pages/searchResults', { resultsArray: yelpData, });

    })
    .catch((error) => {
      Error(error, res);
    });
}

//Response status for unexpected failures
function Error(error, res) {
  console.error(error);
  return res.status(500).send('Oops! Something went wrong! Please try again in 401');
}

//Constructor function for data recieved from yelp API
function Restaurant(otherData) {
  let regex = /^(https:)/;
  if (regex.test(otherData.image_url)) {
    otherData.image_url.replace(regex, '');
  }

  this.restaurant = otherData.name;
  // eslint-disable-next-line camelcase
  this.img_url = otherData.image_url;
  this.budget = otherData.price;
  this.rating = otherData.rating;
  this.link_url = otherData.url;
  this.address = otherData.display_address;
  this.phone = otherData.display_phone;
}

function addToSavedDates(req, res) {
  let { restaurant, budget, link_url, img_url, rating, phone } = req.body;
  let SQL = 'INSERT INTO saved_dates (restaurant, budget, link_url, img_url, rating, phone ) VALUES ($1, $2, $3, $4, $5);';
  let safeValues = [restaurant, budget, link_url, img_url, rating, phone ];

  return client.query(SQL, safeValues)
    .then(results => {
      // console.log(results.rows);
      res.redirect('/');
    })
    .catch((error) => {
      Error(error, res);
    });
}

module.exports = handleYelp;
