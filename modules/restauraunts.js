// 'use strict';

// const client = require('./client.js');
// const superagent = require('superagent');
// const error = require('./error.js');
// require('dotenv').config();

// function handleYelp(req, res) {
//   const zomatoObject = req.query.data;
//   const url = `https://api.yelp.com/v3/businesses/search?location=${locationObj.search_query}`

//   superagent.get(url).set(`Authorization`, `Bearer ${process.env.YELP_API_KEY}`)
//     .then(resultsFromAPI => {
//       console.log(resultsFromAPI.body);
//       //Creating an array yelp businesses and returning data to the webpage
//       const yelpData = resultsFromAPI.body.businesses.map(businesses => {
//         return new Business(businesses);
//       })

//       res.status(200).send(yelpData);
//     })
//     .catch((err => {
//       error(err, res)
//     })
// }