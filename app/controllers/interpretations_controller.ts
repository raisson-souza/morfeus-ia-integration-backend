import { createInterpretationValidator, getInterpretationValidator, listInterpretationValidator } from '#validators/interpretation'
import { inject } from '@adonisjs/core'
import { InterpretationListed } from '../types/interpretationTypes.js'
import Interpretation from '#models/interpretation'
import InterpretationService from '#services/interpretation_service'
import ResponseSender from '../functions/core/ResponseMessage.js'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class InterpretationsController {
    constructor(protected interpretationService : InterpretationService) { }

    async create({ request, response }: HttpContext): Promise<void> {
        try {
            const { access, dream, title } = await request.validateUsing(createInterpretationValidator)
            const interpretation = await this.interpretationService.CreateDreamInterpretation({
                access: access,
                dream: dream,
                title: title,
            })
            ResponseSender<Interpretation>({ response, status: 201, data: interpretation })
        }
        catch (ex) {
            ResponseSender<string>({ response, data: ex as Error })
        }
    }

    async get({ request, response, params }: HttpContext): Promise<void> {
        try {
            const { id } = params
            const { access } = await request.validateUsing(getInterpretationValidator)
            const interpretation = await this.interpretationService.GetDreamInterpretation({
                access: access,
                interpretationId: id,
            })
            ResponseSender<Interpretation>({ response, status: 200, data: interpretation })
        }
        catch (ex) {
            ResponseSender<string>({ response, data: ex as Error })
        }
    }

    async list({ request, response }: HttpContext): Promise<void> {
        try {
            const { access } = await request.validateUsing(listInterpretationValidator)
            const interpretations = await this.interpretationService.ListDreamInterpretations({
                access: access,
            })
            ResponseSender<InterpretationListed[]>({ response, status: 200, data: interpretations })
        }
        catch (ex) {
            ResponseSender<string>({ response, data: ex as Error })
        }
    }
}