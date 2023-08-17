import { PasswordService } from '../../service/password-service'

describe('PasswordService', () => {
    it('should hash a password', () => {
        const passwordService = new PasswordService()
        const encryptedData = passwordService.encryptPassword('valid-password')

        expect(encryptedData.hash).not.toEqual('password')
        expect(encryptedData.salt).not.toEqual('password')
        expect(encryptedData.hash).toBeDefined()
        expect(encryptedData.salt).toBeDefined()
    })

    it('should compare a password and return a valid response', () => {
        const passwordService = new PasswordService()
        const encryptedData = passwordService.encryptPassword('password')

        const isValid = passwordService.comparePassword(
            'password',
            encryptedData,
        )

        expect(isValid).toEqual(true)
    })

    it('should compare a password and return a invalid response', () => {
        const passwordService = new PasswordService()
        const hash = passwordService.encryptPassword('password')
        const isValid = passwordService.comparePassword(
            'invalid-password',
            hash,
        )

        expect(isValid).toEqual(false)
    })
})
