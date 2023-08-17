export interface PasswordServiceInterface {
    encryptPassword(password: string): EncryptedData
    comparePassword(password: string, encryptedPassword: EncryptedData): boolean
}

export type EncryptedData = {
    salt: string
    hash: string
}
