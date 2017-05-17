exports.up = (knex) => {
  return knex.schema.createTable('classifieds', (table) => {
    // CREATING SERIAL PRIMARY KEY
    table.increments();
    table.string('title', 255).notNullable();
    table.string('description', 255).notNullable();
    table.decimal('price').notNullable();
    table.string('item_image', 255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('classifieds');
};
