'use strict';

console.log(`I'm handling things`);

const client = require('./client.js');
const superagent = require('superagent');
const error = require('./error.js');
const handleYelp = require('./restauraunt.js');
// const handleMovies = require('./movie.js');

function handleLocation(req, res) {
  console.log('We are here: ');

  const location = req.body.search;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GEOCODE_API_KEY}`;
  console.log(url);
  queryDatabase(location, res, url);
}

function queryDatabase(req, res, url) {
  let SQL = `SELECT * FROM locations WHERE city=$1`;
  let value = [req];
  console.log('now we are here');
  return client.query(SQL, value)
    .then(results => {
      //Check to see if location already exists in database
      if (results.rowCount > 0) {
        // console.log('from database', results.rows);
        //If found send to the front end
        handleYelp(req, res, results.rows[0]);
        // handleMovies(req, res, results.rows[0]);
      } else {
        // console.log('getting data from API');
        //If data does not exist in database retrieve from API
        superagent.get(url)
          .then(resultsFromAPI => {
            // console.log(resultsFromAPI.body);
            //Create an object location and return to the front end
            const locationObj = new CityLocation(req, resultsFromAPI.body.results[0]);
            console.log(locationObj);

            handleYelp(req, res, locationObj);
            // handleMovies(req, res, locationObj);

            //Store new location object in the database
            addToDatabase(locationObj, res);
          })
          .catch((err) => {
            error(err, res);
          });
      }
    })
    .catch(err => error(err, res));
}
function CityLocation(cityName, someData) {
  this.city = cityName;
  this.lat = someData.geometry.location.lat;
  this.long = someData.geometry.location.lng;
}

//Function for adding the location object to the database
function addToDatabase(locationObj, res) {
  let SQL = 'INSERT INTO locations (city, lat, long) VALUES ($1, $2, $3) RETURNING *';
  let safeValues = [locationObj.city, locationObj.lat, locationObj.long];
  client.query(SQL, safeValues)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => error(err, res));
}

module.exports = handleLocation;
