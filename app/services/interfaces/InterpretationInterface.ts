import { FullInterpretation, InterpretationListed } from "../../types/interpretationTypes.js"

export default interface InterpretationInterface {
    CreateDreamInterpretation(model: CreateDreamInterpretationProps): Promise<FullInterpretation>
    // RecreateDreamInterpretation()
    // RecreateDreamInterpretationImage()
    GetDreamInterpretation(model: GetDreamInterpretationProps): Promise<FullInterpretation>
    ListDreamInterpretations(model: ListDreamInterpretationsProps): Promise<InterpretationListed[]>
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