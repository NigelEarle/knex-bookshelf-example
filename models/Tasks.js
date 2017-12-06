const bookshelf = require('./bookshelf.js');

const Tasks = bookshelf.Model.extend({
  tableName: 'tasks'
});

module.exports = Tasks;
