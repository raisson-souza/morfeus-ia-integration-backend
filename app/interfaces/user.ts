import { AccessToken } from "@adonisjs/auth/access_tokens"
import { CreateUserProps, UpdateUserProps } from "../types/user.js"
import IEntity from "./base/IEntity.js"
import User from "#models/user"

export default interface IUserService extends IEntity<User, CreateUserProps, UpdateUserProps> {
    Login(email: string, password: string): Promise<AccessToken>
}