import vine from '@vinejs/vine'

const createInterpretationValidator = vine.compile(
    vine.object({
        access: vine.string(),
        dream: vine.string(),
        title: vine.string(),
    })
)

const getInterpretationValidator = vine.compile(
    vine.object({
        access: vine.string(),
    })
)

const listInterpretationValidator = vine.compile(
    vine.object({
        access: vine.string(),
    })
)

export {
    createInterpretationValidator,
    getInterpretationValidator,
    listInterpretationValidator,
}