import { BaseModel, beforeUpdate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import CustomException from '#exceptions/custom_exception'
import DirectAccess from './direct_access.js'
import MorfeusAccess from './morfeus_access.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Interpretation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dream: string

  @column()
  declare title: string

  @column()
  declare dreamOntopsychologyInterpretation: string | null

  @column()
  declare dreamPsychoanalysisInterpretation: string | null

  @column()
  declare imagePath: string | null

  @belongsTo(() => DirectAccess)
  declare directAccess: BelongsTo<typeof DirectAccess>

  @column()
  declare directAccessId: number | null

  @belongsTo(() => MorfeusAccess)
  declare morfeusAccess: BelongsTo<typeof MorfeusAccess>

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

  getRawAccess(): string {
    const access = this.getAccess()
    if (access instanceof DirectAccess)
      return access.key
    return access.apiKey
  }

  @beforeUpdate()
  static async update(interpretation: Interpretation) {
    interpretation.updatedAt = DateTime.now()
  }
}