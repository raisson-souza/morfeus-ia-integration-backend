import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'interpretations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('dream').notNullable()
      table.string('title').notNullable()
      table.text('dream_ontopsychology_interpretation').nullable()
      table.text('dream_psychoanalysis_interpretation').nullable()
      table.string('image_path').nullable()
      table.integer('direct_access_id').unsigned().references("id").inTable("direct_accesses").onDelete('CASCADE').nullable()
      table.integer('morfeus_access_id').unsigned().references("id").inTable("morfeus_accesses").onDelete('CASCADE').nullable()
      table.timestamp('created_at').defaultTo(this.db.rawQuery('now()').knexQuery).notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}