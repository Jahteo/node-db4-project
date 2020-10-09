
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {id: 1, name: 'cup(s) of peanut butter'},
        {id: 2, name: 'cup(s) of sugar'},
        {id: 3, name: 'eggs'},
        {id: 4, name: 'teaspoon(s) lapsang souchong tea leaves'},
        {id: 5, name: "oz's boiling water"},
      ]);
    });
};
