const bookshelf = require('./bookshelf.js');
const Tasks = require('./Tasks.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function() {
    return this.hasMany(Tasks);
  }
});

module.exports = User;