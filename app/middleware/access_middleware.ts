import ResponseSender from '../functions/core/ResponseMessage.js'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AccessMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      const access = ctx.request.header("authorization")?.split(" ")[1] ?? null

      if (!access)
        throw new Error()

      ctx.request.updateBody({ ...ctx.request.body(), "access": access })

      return await next()
    }
    catch {
      ResponseSender<string>({ response: ctx.response, status: 401, data: "Autenticação não encontrada ou mal formatada." })
    }
  }
}