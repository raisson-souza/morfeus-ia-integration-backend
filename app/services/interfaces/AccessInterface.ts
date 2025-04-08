export default interface AccessInterface {
    DirectAccess(model: DirectAccessProps): Promise<string>
    MorfeusAccess(model: MorfeusAccessProps): Promise<string>
}

export type DirectAccessProps = {
    ip: string
}

export type MorfeusAccessProps = {
    ip: string
    userId: number
}