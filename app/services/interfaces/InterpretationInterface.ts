import { InterpretationListed } from "../../types/interpretationTypes.js"
import { MultipartFile } from "@adonisjs/core/bodyparser"
import Interpretation from "#models/interpretation"

export default interface InterpretationInterface {
    CreateDreamInterpretation(model: CreateDreamInterpretationProps): Promise<Interpretation>
    RegenerateInterpretation(model: RegenerateInterpretationProps): Promise<Interpretation>
    RegenerateImage(model: RegenerateImageProps): Promise<string | null>
    GetDreamInterpretation(model: GetDreamInterpretationProps): Promise<Interpretation>
    ListDreamInterpretations(model: ListDreamInterpretationsProps): Promise<InterpretationListed[]>
    GetInterpretationImage(model: GetInterpretationImageProps): Promise<string | null>
    InterpretationByAudio(model: InterpretationByAudioProps): Promise<Interpretation>
}

export type CreateDreamInterpretationProps = {
    access: string
    dream: string
    title: string
}

export type GetDreamInterpretationProps = {
    access: string
    interpretationId: number
}

export type ListDreamInterpretationsProps = {
    access: string
}

export type GetInterpretationImageProps = {
    interpretationId: number
    access: string
}

export type InterpretationByAudioProps = {
    file: MultipartFile
    access: string
    title: string
}

export type RegenerateInterpretationProps = {
    access: string
    interpretationId: number
}

export type RegenerateImageProps = {
    access: string
    interpretationId: number
}
