
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          title: 'take out trash',
          is_complete: false,
          user_id: 1
        },
        {
          title: 'walk the dog',
          is_complete: true,
          user_id: 2
        },
        {
          title: 'pick up groceries',
          is_complete: false,
          user_id: 3
        },
        {
          title: 'pick up mom from work',
          is_complete: true,
          user_id: 1
        },
        {
          title: 'vaccuum the house',
          is_complete: false,
          user_id: 2
        },
        {
          title: 'clean the kitchen',
          is_complete: true,
          user_id: 3
        },
        {
          title: 'sweep the floors',
          is_complete: false,
          user_id: 1
        },
        {
          title: 'wash the car',
          is_complete: true,
          user_id: 2
        },
        {
          title: 'call the plumber',
          is_complete: false,
          user_id: 3
        }
      ]);
    });
};
