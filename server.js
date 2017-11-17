const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const PORT = process.env.PORT || 3000;

const app = express();

const knexConfig = knex({
  client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    user: 'nwre87',
    database: 'bookshelf_example',
    charset: 'utf8'
  }
});

const bookshelf = require('bookshelf')(knexConfig);

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
  User.where('id', id)
  .fetch({
    withRelated: ['tasks']
  })
  .then(user => {
    res.json({
      tasks: user.related('tasks').toJSON()
    });
  })
  .catch(err => {
    res.json({ err });
  })
})

app.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`Server listening on port: ${PORT}`);
});