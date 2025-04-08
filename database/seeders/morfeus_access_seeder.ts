import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import MorfeusAccess from '#models/morfeus_access'

export default class extends BaseSeeder {
  async run() {
    const morfeusDefaultUserApiKey = Buffer.from(`0.0.0.0/0/${ DateTime.now().toISO() }`).toString("base64")
    await MorfeusAccess.create({
      userId: 0,
      apiKey: morfeusDefaultUserApiKey,
    })
  }
}