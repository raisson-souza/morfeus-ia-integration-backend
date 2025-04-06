import { BaseModel, beforeUpdate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Interpretation from './interpretation.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class InterpretationImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare path: string | null

  @belongsTo(() => Interpretation)
  declare interpretation: BelongsTo<typeof Interpretation>

  @column()
  declare interpretationId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare updatedAt: DateTime | null

  @beforeUpdate()
  static async update(interpretationImage: InterpretationImage) {
    interpretationImage.updatedAt = DateTime.now()
  }
}