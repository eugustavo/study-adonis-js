'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProjectSchema extends Schema {
  up() {
    this.create('projects', table => {
      table
        .uuid('id')
        .unique()
        .defaultTo(this.db.raw('public.gen_random_uuid()'))
        .primary();
      table
        .uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('projects');
  }
}

module.exports = ProjectSchema;
