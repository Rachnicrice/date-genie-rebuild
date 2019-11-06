'use strict';

console.log(`I'm doing movie things`);

const client = require('./client.js');
const superagent = require('superagent');
const error = require('./error.js');

function handleMovies(req, res) {
  console.log('We are here: ');

  // const location = req.body.search;
  const lat = 47.7543;
  const long = -122.1635;
  const distance = 5;

  const url = `https://api.internationalshowtimes.com/v4/cinemas/?location=${lat},${long}&distance=${distance}&apikey=${process.env.INTL_API_KEY}`;
  console.log(url);

  let theaters = [];
  superagent.get(url)
    .then(theaterResults => {
      theaterResults.body.cinemas.forEach(theater => {
        // eslint-disable-next-line camelcase
        let theater_id = theater.id;
        // eslint-disable-next-line camelcase
        theaters.push(new Theater(theater));
      });
      // return theaters;
      return theaters;
    })
    .then(allTheaters => {
      let allMovies = {};
      let sevenDays = '2019-11-12T00:00:00-08:00';
      allTheaters.forEach(theaterObj => {
        let url2 = `https://api.internationalshowtimes.com/v4/movies/?cinema_id=${theaterObj.id}&time_to=${sevenDays}&apikey=${process.env.INTL_API_KEY}`;
        superagent.get(url2)
          .then(results => {
            results.body.movies.forEach(moviesArray => {
              // console.log(movieArray);
              let movie_id = moviesArray.id;
              if (allMovies[movie_id]) {
                allMovies[movie_id].playing_at.push(theaterObj.id);
                // allMovies[i].playing_at.push(theaterObj.id);
              } else {
                // eslint-disable-next-line camelcase
                allMovies[movie_id] = new Movie(moviesArray, theaterObj);
              }
            });
          }) .then(allTheMovies => {
            console.log(allMovies);
          });
      });
    });
}

function Theater(theaterObj) {
  this.id = theaterObj.id;
  this.name = theaterObj.name;
  this.telephone = theaterObj.telephone;
  this.website = theaterObj.website;
  this.displayAddress = theaterObj.location.address.display_text;
}

function Movie(movieObj, theaterObj) {
  this.id = movieObj.id;
  this.title = movieObj.title;
  // eslint-disable-next-line camelcase
  this.poster_image = movieObj.poster_image_thumbnail;
  // eslint-disable-next-line camelcase
  this.playing_at = [theaterObj.id];
}


// function queryDatabase(req, res, url) {
//   let SQL = `SELECT * FROM locations WHERE city=$1`;
//   let value = [req];
//   // console.log(value);
//   return client.query(SQL, value)
//     .then(results => {
//       //Check to see if location already exists in database
//       if (results.rowCount > 0) {
//         // console.log('from database', results.rows);
//         //If found send to the front end
//         handleYelp(req, res, results.rows[0]);
//       } else {
//         // console.log('getting data from API');
//         //If data does not exist in database retrieve from API
//         superagent.get(url)
//           .then(resultsFromAPI => {
//             // console.log(resultsFromAPI.body);
//             //Create an object location and return to the front end
//             const locationObj = new CityLocation(req, resultsFromAPI.body.results[0]);
//             console.log(locationObj);

//             handleYelp(req, res, locationObj);

//             //Store new location object in the database
//             addToDatabase(locationObj, res);
//           })
//           .catch((err) => {
//             error(err, res);
//           });
//       }
//     })
//     .catch(err => error(err, res));
// }
// function CityLocation(cityName, someData) {
//   this.city = cityName;
//   this.lat = someData.geometry.location.lat;
//   this.long = someData.geometry.location.lng;
// }

// //Function for adding the location object to the database
// function addToDatabase(locationObj, res) {
//   let SQL = 'INSERT INTO locations (city, lat, long) VALUES ($1, $2, $3) RETURNING *';
//   let safeValues = [locationObj.city, locationObj.lat, locationObj.long];
//   client.query(SQL, safeValues)
//     .then(results => {
//       // res.status(200).json(results);
//     })
//     .catch(err => error(err, res));
// }

module.exports = handleMovies;
