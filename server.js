const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

// db config for current environment
const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile')[environment];

// use env config to instantiate knex
const knex = require('knex')(config);

// pass knex instance to bookshelf
const bookshelf = require('bookshelf')(knex);

const User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function() {
    return this.hasMany(Task);
  }
});

const Tasks = bookshelf.Model.extend({
  tableName: 'tasks'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/users', (req, res) => {
  // fetch all users
  User.fetchAll()
  .then(users => {
    res.json({
      users: users.serialize()
    });
  })
  .catch(err => {
    res.json({ err });
  });
});

app.get('/api/users/:id/tasks', (req, res) => {
  // fetch all tasks related to user id
  const { id } = req.params;
  Tasks.where({ user_id: id })
  .fetchAll()
  .then(tasks => {
    res.json({ tasks });
  })
  .catch(err => {
    res.json({ err });
  });
})

app.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`Server listening on port: ${PORT}`);
});