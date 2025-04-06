import { BaseModel, beforeUpdate, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Interpretation from './interpretation.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class MorfeusAccess extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  /** ID original do usuário no Morfeus */
  @column()
  declare userId: number

  /** Chave da API de autenticação do usuário do Morfeus */
  @column()
  declare apiKey: string

  @hasMany(() => Interpretation)
  declare interpretations: HasMany<typeof Interpretation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeUpdate()
  static async update(directAcess: MorfeusAccess) {
    directAcess.updatedAt = DateTime.now()
  }
}