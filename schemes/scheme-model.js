const db = require('../data/db-config.js');

module.exports = {
  getRecipes,
  getShoppingList,
  getInstructions,
  // add,
  // getById,
  // update,
  // remove,
  // getUserPosts
}

//now define them (ie: move them from where they were in the router file before)
//const add = ... <-- this won't get hoisted, so we use the format below. purely so we can put the exports at the top bc they're the most important thing for folks to reference & know what they can use.
function getRecipes() {
  return db('recipes');
}

//select quantity, ingredients.name
// from recipe_ingredients
// join ingredients on recipe_ingredients.ingredient_id = ingredients.id
// where recipe_id = 1
function getShoppingList(recipe_id) {
  return db('recipe_ingredients')
    .join('ingredients', 'recipe_ingredients.ingredient_id', '=', 'ingredients.id')
    .select('recipe_ingredients.quantity', 'ingredients.name')
    .where('recipe_id', recipe_id)
}

function getInstructions(recipe_id) {
  return db('recipe_ingredients')
    .join('ingredients', 'recipe_ingredients.ingredient_id', '=', 'ingredients.id')
    .select('ingredients.name', 'recipe_ingredients.instructions')
    .where('recipe_id', recipe_id)
}
//this can actually get pulled from below
function getById(id) {
  return db("users").where({ id }).first();
}


//above defaults to just returning the id that was created, lets change it to returning the whole user just created
// return the user from the database
function add(user) {
  return db("users")
      .insert(user, "id")
      .then(ids => {
          const id = ids[0];

          // all queries return an array,
          // even if it only has one element
          // .first() will extract the first element
          // from the array and return it
          // return db("users").where({ id }).first();

          return getById(id);
      });
}

function update(id, changes) {
  return db("users")
  .where({ id })
  .update(changes)
};

function remove(id) {
  return db("users").where({ id }).del();
}

function getUserPosts (id) {
  return db('posts').where("user_id", id)
}