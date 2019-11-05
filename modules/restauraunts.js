'use strict';

const superagent = require('superagent');
require('dotenv').config();

function handleYelp(req, res, locationObj) {
  const url = `https://api.yelp.com/v3/businesses/search?location=${locationObj.search_query}`;
  superagent.get(url).set(`Authorization`, `Bearer ${process.env.YELP_API_KEY}`)
    .then(resultsFromAPI => {
      //Creating an array yelp businesses and returning data to the webpage
      const yelpData = resultsFromAPI.body.businesses.map(businesses => {
        return new Business(businesses);
      });
      console.log(yelpData);
      res.status(200).render('/search_results',yelpData);
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
function Business(otherData) {
  this.name = otherData.name;
  this.image_url = otherData.image_url;
  this.price = otherData.price;
  this.rating = otherData.rating;
  this.url = otherData.url;
}

module.exports = handleYelp;
