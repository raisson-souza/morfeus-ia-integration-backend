import vine from '@vinejs/vine'

const createDirectAccessValidator = vine.compile(
    vine.object({ })
)

const createMorfeusAccessValidator = vine.compile(
    vine.object({
        userId: vine.number(),
    })
)

export {
    createDirectAccessValidator,
    createMorfeusAccessValidator,
}