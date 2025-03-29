import { AccessToken } from "@adonisjs/auth/access_tokens"
import { CreateUserProps, UpdateUserProps, UserInput } from "../types/user.js"
import { Pagination } from "../types/pagination.js"
import CustomException from "#exceptions/custom_exception"
import db from "@adonisjs/lucid/services/db"
import IEntity from "../interfaces/base/IEntity.js"
import User from "#models/user"

export default class UserService implements IEntity<User, CreateUserProps, UpdateUserProps> {
    async Create(createProps: CreateUserProps, validate = true): Promise<User> {
        return await db.transaction(async (trx) => {
            if (validate) await this.ValidateCreation(createProps)
            return await User.create(createProps, { client: trx })
        })
    }

    async ValidateCreation(createProps: UserInput): Promise<void> {
        const sameUserInfo = await User.query()
            .where("name", createProps.name)
            .orWhere("email", createProps.email)
        if (sameUserInfo.length > 0)
            throw new CustomException(400, "Credenciais de usuários já cadastradas no sistema.")
    }

    async Update(updateProps: UpdateUserProps, validate = true): Promise<User> {
        const user = await this.Get(updateProps.id)
        if (!user) throw new CustomException(404, "Usuário não encontrado.")

        return await db.transaction(async (trx) => {
            if (validate) await this.ValidateUpdate(updateProps)
            return await User.updateOrCreate({ id: updateProps.id }, updateProps, { client: trx })
        })
    }

    async ValidateUpdate(updateProps: UpdateUserProps): Promise<void> {
        const sameUserInfo = await User.query()
            .whereNot("id", updateProps.id)
            .andWhere(query => {
                query.where("name", updateProps.name)
                query.orWhere("email", updateProps.email)
            })
        if (sameUserInfo.length > 0)
            throw new CustomException(400, "Credenciais de usuários já cadastradas no sistema.")
    }

    async Get(id: number): Promise<User | null> {
        return await User.find(id)
    }

    async Delete(id: number): Promise<void> {
        const user = await this.Get(id)
        if (!user) throw new CustomException(404, "Usuário não encontrado.")
        await user.delete()
    }

    async List({
        page,
        limit,
        orderBy,
        orderByDirection
    }: Pagination) {
        return await User.query()
            .orderBy(orderBy, orderByDirection)
            .paginate(page, limit)
    }

    async Login(email: string, password: string) : Promise<AccessToken> {
        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user, ["*"], { expiresIn: "1h" })
        return token
    }
}