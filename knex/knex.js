const environment = process.env.ENVIRONMENT || 'development';
const config = require('../knexfile')[environment];

// use env config to instantiate knex
module.exports = require('knex')(config);
