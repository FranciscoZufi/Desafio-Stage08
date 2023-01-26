exports.up = function (knex) {
  return knex.schema.table('notes', table => {
    table.string('rating', 5)
  })
}
exports.down = function (knex) {
  return knex.schema.table('notes', table => {
    table.dropColumn('rating')
  })
}
