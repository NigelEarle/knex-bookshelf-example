const knex = require('../knex/knex');

// use bookshelf instance to create models
module.exports = require('bookshelf')(knex);

