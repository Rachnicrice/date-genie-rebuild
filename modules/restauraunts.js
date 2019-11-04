'use strict';

const client = require('./client.js');
const superagent = require('superagent');
require('dotenv').config();

function handleZomato (request, response) {
  const zomatoObject = request.query.data;
  const url = ``
}