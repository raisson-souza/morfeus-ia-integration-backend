import { BaseModel, beforeUpdate, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Interpretation from './interpretation.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class DirectAccess extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare key: string

  @hasMany(() => Interpretation)
  declare interpretations: HasMany<typeof Interpretation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  decodeKey(): { ip: string; timestamp: DateTime } {
    const stringsKey = Buffer.from(this.key).toString("ascii").split("/")
    return {
      ip: stringsKey[0],
      timestamp: DateTime.fromISO(stringsKey[1]),
    }
  }

  encodeKey(ip: string, timestamp: DateTime): string {
    const stringKey = `${ ip }/${ timestamp.toISO() }`
    return Buffer.from(stringKey).toString("base64")
  }

  @beforeUpdate()
  static async update(directAcess: DirectAccess) {
    directAcess.updatedAt = DateTime.now()
  }
}