// 'use strict';

// console.log(`I'm doing movie things`);
// // const client = require('./client.js');
// const superagent = require('superagent');
// const error = require('./error.js');

// function handleMovies(req, res, locationObj) {
//   console.log('We are here: in movies');
//   console.log(locationObj);
//   //TODO: use location search again to get location object (or pass the same object from a previous search). This is currently using hard coded values for seattle lat/long.
//   const lat = 47.7543;
//   const long = -122.1635;
//   const distance = 30;
//   //TODO: switch to setting headers for api key instead of passing it in the url
//   const url = `https://api.internationalshowtimes.com/v4/cinemas/?location=${lat},${long}&distance=${distance}&apikey=${process.env.INTL_API_KEY}`;
//   console.log(url);
//   let theaters = [];
//   superagent
//     .get(url)
//     .then(theaterResults => {
//       theaterResults.body.cinemas.forEach(theater => {
//         theaters.push(new Theater(theater));
//       });
//       // return theaters;
//       return theaters;
//     })
//     .then(allTheaters => {
//       console.log(allTheaters);
//       var date = new Date();
//       //gets a correctly formatted date 7 days from now. Allows user to see movies currently in theaters or that will be released in the next 7 days.
//       let sevenDays = new Date(date.setDate(date.getDate() + 7));
//       let allMovies = {};
//       allTheaters.forEach(theaterObj => {
//         let url2 = `https://api.internationalshowtimes.com/v4/movies/?cinema_id=${theaterObj.id}&time_to=${sevenDays}&all_fields=true&apikey=${process.env.INTL_API_KEY}`;
//         superagent
//           .get(url2)
//           .then(results => {
//             results.body.movies.forEach(moviesArray => {
//               // eslint-disable-next-line camelcase
//               let movie_id = moviesArray.id;
//               if (allMovies[movie_id]) {
//                 allMovies[movie_id].playing_at.push(theaterObj.id);
//               } else if (moviesArray.title !== null) {
//                 // eslint-disable-next-line camelcase
//                 allMovies[movie_id] = new Movie(moviesArray, theaterObj);
//               }
//             });
//             return allMovies;
//           })
//           .then(allTheMovies => {
//             //Turn the movie object into an array using Object.keys and .map
//             let moviesObject = Object.keys(allTheMovies).map(
//               i => allTheMovies[i]
//             );
//             console.log(moviesObject);
//             console.log('I sent you movies, you are welcome');
//           })
//           .catch(err => {
//             error(err, res);
//           });
//       });
//     })
//     .catch(err => {
//       error(err, res);
//     });
// }
// function Theater(theaterObj) {
//   this.id = theaterObj.id;
//   this.name = theaterObj.name;
//   this.telephone = theaterObj.telephone;
//   this.website = theaterObj.website;
//   this.displayAddress = theaterObj.location.address.display_text;
// }
// function Movie(movieObj, theaterObj) {
//   this.id = movieObj.id;
//   this.title = movieObj.title;
//   // eslint-disable-next-line camelcase
//   this.poster_image = movieObj.poster_image_thumbnail;
//   // eslint-disable-next-line camelcase
//   this.playing_at = [theaterObj.id];
//   this.synopsis = movieObj.synopsis;
//   this.runtime = `${movieObj.runtime} minutes`;
//   this.genres = movieObj.genres;
//   this.trailer =
//     (movieObj.trailers &&
//       movieObj.trailers[0] &&
//       movieObj.trailers[0].trailer_files[0] &&
//       movieObj.trailers[0].trailer_files[0].url) ||
//     'unknown';
//   this.ratings =
//     (movieObj.ratings &&
//       movieObj.ratings.imdb &&
//       movieObj.ratings.imdb.value) ||
//     'unknown';
//   // eslint-disable-next-line camelcase
//   this.ratings_vote_count =
//     (movieObj.ratings &&
//       movieObj.ratings.imdb &&
//       `${movieObj.ratings.imdb.vote_count} votes`) ||
//     'unknown';
//   // eslint-disable-next-line camelcase
//   this.age_limits =
//     (movieObj.age_limits && `Rated ${movieObj.age_limits.US}`) ||
//     'unknown rating';
//   // eslint-disable-next-line camelcase
//   this.release_date =
//     (movieObj.release_dates &&
//       movieObj.release_dates.US &&
//       movieObj.release_dates.US[0] &&
//       movieObj.release_dates.US[0].date) ||
//     'unknown';
// }
// module.exports = handleMovies;
