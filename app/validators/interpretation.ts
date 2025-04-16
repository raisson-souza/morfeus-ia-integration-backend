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

const getInterpretationImageValidator = vine.compile(
    vine.object({
        access: vine.string(),
    })
)

const interpretationByAudioValidator = vine.compile(
    vine.object({
        access: vine.string(),
        title: vine.string(),
    })
)

const regenerateInterpretationValidator = vine.compile(
    vine.object({
        access: vine.string(),
    })
)

const regenerateImageValidator = vine.compile(
    vine.object({
        access: vine.string(),
    })
)

export {
    createInterpretationValidator,
    getInterpretationValidator,
    listInterpretationValidator,
    getInterpretationImageValidator,
    interpretationByAudioValidator,
    regenerateInterpretationValidator,
    regenerateImageValidator,
}