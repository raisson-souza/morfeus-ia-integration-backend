import { InterpretationListed } from "../../types/interpretationTypes.js"
import Interpretation from "#models/interpretation"

export default interface InterpretationInterface {
    CreateDreamInterpretation(model: CreateDreamInterpretationProps): Promise<Interpretation>
    // RecreateDreamInterpretation()
    // RecreateDreamInterpretationImage()
    GetDreamInterpretation(model: GetDreamInterpretationProps): Promise<Interpretation>
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