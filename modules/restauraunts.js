'use strict';

const client = require('./client.js');
const superagent = require('superagent');
const error = require('./error.js');
require('dotenv').config();

function handleZomato (req, res) {
  const zomatoObject = req.query.data;
  // const url =

