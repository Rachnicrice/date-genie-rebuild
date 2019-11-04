'use strict';

function error(error, response) {
  console.error(error);
  return response.status(500).send('Oops! Something went wrong! Please try again in 401');
}

module.exports = error;
