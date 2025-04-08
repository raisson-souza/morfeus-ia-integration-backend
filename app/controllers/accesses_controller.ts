import { createDirectAccessValidator, createMorfeusAccessValidator } from '#validators/access'
import { inject } from '@adonisjs/core'
import AccessService from '#services/access_service'
import ResponseSender from '../functions/core/ResponseMessage.js'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AccessesController {
    constructor(protected accessService : AccessService) { }

    async direct({ request, response }: HttpContext): Promise<void> {
        try {
            const _ = await request.validateUsing(createDirectAccessValidator)
            const key = await this.accessService.DirectAccess({
                ip: request.ip(),
            })
            ResponseSender<string>({ response, status: 201, data: key })
        }
        catch (ex) {
            ResponseSender<string>({ response, data: ex as Error })
        }
    }

    async morfeus({ request, response }: HttpContext): Promise<void> {
        try {
            const { userId } = await request.validateUsing(createMorfeusAccessValidator)
            const apiKey = await this.accessService.MorfeusAccess({
                ip: request.ip(),
                userId: userId,
            })
            ResponseSender<string>({ response, status: 201, data: apiKey })
        }
        catch (ex) {
            ResponseSender<string>({ response, data: ex as Error })
        }
    }
}