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

// Models
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


// ==== ENDPOINTS ====
// all req.params.id would come from req.user or if authenticated - available through passport.js


app.get('/api/users', (req, res) => {
  // fetch all users

  User.fetchAll()
  .then(users => {
    return res.json({
      users: users.serialize()
    });
  })
  .catch(err => {
    return res.json({ err });
  });
});

app.get('/api/users/:user_id/tasks', (req, res) => {
  // fetch all tasks associated to user id

  const { user_id } = req.params;

  Tasks.where({ user_id })
  .fetchAll()
  .then(tasks => {
    return res.json(tasks);
  })
  .catch(err => {
    return res.json(err);
  });
});

app.get('/api/tasks/:task_id', (req, res) => {
  // get single task by id

  const { task_id } = req.params;

  Tasks.where('id', task_id)
  .fetch()
  .then(task => {
    return res.json(task)
  })
  .catch(err => {
    return res.json(err)
  })

});

app.post('/api/users/:id/tasks/new', (req, res) => {
  // add new task, associated to user

  const payload = {
    title: req.body.title,
    is_complete: req.body.is_complete,
    user_id: req.params.id
  };

  new Tasks(payload)
  .save()
  .then(result => {
    return res.json(result)
  })
  .catch(err => {
    return res.json(err);
  });

  // Alternate INSERT

  Tasks.forge(payload)
  .save()
  .then(result => {
    return res.json(result);
  })
  .catch(err => {
    return res.json(err);
  });
});

app.put('/api/tasks/:task_id/update', (req, res) => {
  // update task

  const { task_id } = req.params;

  const payload = {
    title: req.body.title,
    is_complete: req.body.is_complete,
    updated_at: new Date
  }

  Tasks.where('id', task_id)
  .fetch()
  .then(task => {
    return task.save(payload)
  })
  .then(result => {
    return res.json(result);
  })
  .catch(err => {
    return res.json(err);
  })
});

app.delete('/api/tasks/:task_id/delete', (req, res) => {
  // delete task

  const { task_id } = req.params;

  Tasks.where('id', task_id)
  .destroy()
  .then(result => {
    return res.json({success: true});
  })
  .catch(err => {
    return res.json(err);
  });
});

app.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`Server listening on port: ${PORT}`);
});