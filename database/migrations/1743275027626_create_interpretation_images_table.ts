import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'interpretation_images'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('path').nullable()
      table.integer('interpretation_id').unsigned().references('id').inTable('interpretations').onDelete('CASCADE').notNullable()
      table.timestamp('created_at').defaultTo(this.db.rawQuery('now()').knexQuery).notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}