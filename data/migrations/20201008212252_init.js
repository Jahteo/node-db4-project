
exports.up = function(knex) {
  return knex.schema
    .createTable('recipes', tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
    })
    .createTable('ingredients', tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
    })
    .createTable('recipe_ingredients', tbl => {
      tbl.increments();
      tbl.integer("recipe_id")
        .unsigned()
        .references("id")
        .inTable("recipes")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.integer("ingredient_id")
        .unsigned()
        .references("id")
        .inTable("ingredients")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.float("quantity", 2).notNullable();
      tbl.text("instructions").notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('recipe_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes');
};
