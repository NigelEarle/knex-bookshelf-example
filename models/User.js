const bookshelf = require('./bookshelf.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function() {
    return this.hasMany(Task);
  }
});

module.exports = User;