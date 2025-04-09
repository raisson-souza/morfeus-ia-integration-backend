import { createInterpretationValidator, getInterpretationImageValidator, getInterpretationValidator, interpretationByAudioValidator, listInterpretationValidator } from '#validators/interpretation'
import { inject } from '@adonisjs/core'
import { InterpretationListed } from '../types/interpretationTypes.js'
import CustomException from '#exceptions/custom_exception'
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

    async getInterpretationImage({ request, response, params }: HttpContext): Promise<void> {
        try {
            const { id } = params
            const { access } = await request.validateUsing(getInterpretationImageValidator)
            const imagePath = await this.interpretationService.GetInterpretationImage({
                interpretationId: id,
                access: access,
            })
            ResponseSender<string | null>({ response, status: 200, data: imagePath })
        }
        catch (ex) {
            ResponseSender<string>({ response, data: ex as Error })
        }
    }

    async interpretationByAudio({ request, response }: HttpContext): Promise<void> {
        try {
            const { access, title } = await request.validateUsing(interpretationByAudioValidator)
            const file = request.file("upload", {
                extnames: ["mp3", "mp4", "wav", "ogg"],
                size: "5mb",
            })

            if (!file)
                throw new CustomException(400, "Arquivo não encontrado.")

            if (!file.isValid || file.hasErrors) {
                if (file.errors.length > 0)
                    throw new CustomException(400, file.errors[0].message)
                else
                    throw new CustomException(400, "Arquivo inválido.")
            }

            const interpretation = await this.interpretationService.InterpretationByAudio({
                access: access,
                title: title,
                file: file,
            })

            ResponseSender<Interpretation>({ response: response, status: 200, data: interpretation })
        }
        catch (ex) {
            ResponseSender<string>({ response, data: ex as Error })
        }
    }
}