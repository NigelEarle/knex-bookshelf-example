
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'nigel@devleague.com',
          password: 'password1'
        },
        {
          email: 'jesse@develague.com',
          password: 'password2'
        },
        {
          email: 'ed@devleague.com',
          password: 'password3'
        }
      ]);
    });
};
