import {
    EncryptedData,
    PasswordServiceInterface,
} from './password-service-interface'
import crypto from 'crypto'

export class PasswordService implements PasswordServiceInterface {
    public encryptPassword(password: string) {
        const salt = crypto.randomBytes(128).toString('base64')
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512')

        return {
            salt,
            hash: hash.toString('hex'),
        }
    }

    public comparePassword(password: string, encryptedData: EncryptedData) {
        const { salt, hash } = encryptedData
        const encryptedHash = crypto.pbkdf2Sync(
            password,
            salt,
            1000,
            64,
            'sha512',
        )

        if (crypto.timingSafeEqual(Buffer.from(hash, 'hex'), encryptedHash)) {
            return true
        }

        return false
    }
}
