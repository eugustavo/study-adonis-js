'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FileSchema extends Schema {
  up() {
    this.create('files', table => {
      table
        .uuid('id')
        .unique()
        .defaultTo(this.db.raw('public.gen_random_uuid()'))
        .primary();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20);
      table.string('subtype', 20);
      table.timestamps();
    });
  }

  down() {
    this.drop('files');
  }
}

module.exports = FileSchema;
