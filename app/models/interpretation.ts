import { BaseModel, beforeUpdate, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import CustomException from '#exceptions/custom_exception'
import DirectAccess from './direct_access.js'
import InterpretationImage from './interpretation_image.js'
import MorfeusAccess from './morfeus_access.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'

export default class Interpretation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dream: string

  @column()
  declare dreamInterpretation: string | null

  @hasOne(() => InterpretationImage)
  declare interpretationImage: HasOne<typeof InterpretationImage>

  @column()
  declare interpretationImageId: number

  @belongsTo(() => DirectAccess)
  declare directAccess: BelongsTo<typeof DirectAccess> | null

  @column()
  declare directAccessId: number | null

  @belongsTo(() => MorfeusAccess)
  declare morfeusAccess: BelongsTo<typeof MorfeusAccess> | null

  @column()
  declare morfeusAccessId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare updatedAt: DateTime | null

  getAccess(): DirectAccess | MorfeusAccess {
    if (this.directAccessId)
      return this.directAccess!
    if (this.morfeusAccessId)
      return this.morfeusAccess!
    throw new CustomException(500, "Não foi possível identificiar o usuário referente na interpretação de sonho.")
  }

  @beforeUpdate()
  static async update(interpretation: Interpretation) {
    interpretation.updatedAt = DateTime.now()
  }
}