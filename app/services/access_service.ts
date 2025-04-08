import { DateTime } from "luxon"
import AccessInterface, { DirectAccessProps, MorfeusAccessProps } from "./interfaces/AccessInterface.js"
import CustomException from "#exceptions/custom_exception"
import DirectAccess from "#models/direct_access"
import MorfeusAccess from "#models/morfeus_access"

export default class AccessService implements AccessInterface {
    async DirectAccess({
        ip,
    }: DirectAccessProps): Promise<string> {
        const key = Buffer.from(`${ ip }/${ DateTime.now().toISO() }`).toString("base64")

        return await DirectAccess.create({
            key: key,
        })
            .then(result => {
                return result.key
            })
    }

    async MorfeusAccess({
        ip,
        userId,
    }: MorfeusAccessProps): Promise<string> {
        await MorfeusAccess.query()
            .where("user_id", userId)
            .first()
            .then(result => {
                if (result)
                    throw new CustomException(403, "Chave de API já gerada para esse usuário em Morfeus.")
            })

        const key = Buffer.from(`${ ip }/${ userId }/${ DateTime.now().toISO() }`).toString("base64")

        return await MorfeusAccess.create({
            userId: userId,
            apiKey: key,
        })
            .then(result => {
                return result.apiKey
            })
    }
}