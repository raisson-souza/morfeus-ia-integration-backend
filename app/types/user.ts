export type UserInput = {
    name : string
    email : string
    password : string
}

export type UserOutput = {
    id : number
} & UserInput

export type CreateUserProps = { } & UserInput

export type UpdateUserProps = { } & CreateUserProps & UserOutput

export type LoginResponse = {
    token: string
    userId: number
    expirationDateMilis: number
}