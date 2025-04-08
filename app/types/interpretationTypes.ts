import { DateTime } from "luxon"
import Interpretation from "#models/interpretation"

export type FullInterpretation = {
    interpretation: Interpretation
    imagePath: string | null
}

export type InterpretationListed = {
    title: string
    createdAt: DateTime
}