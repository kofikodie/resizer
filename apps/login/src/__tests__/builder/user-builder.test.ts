import { UserBuilder } from '../../builder/user/user-builder'

describe('UserBuilder', () => {
    it('should return null if no user data is provided', () => {
        const userBuilder = new UserBuilder()
        const user = userBuilder.build(null)
        expect(user).toBeNull()
    })

    it('should return a user if user data is provided', () => {
        const userBuilder = new UserBuilder()
        const user = userBuilder.build({
            id: 1,
            username: 'test',
            email: 'test@mail.com',
            password: 'password',
            first_name: 'Test',
            last_name: 'User',
            date_of_birth: '1990-01-01',
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        expect(user).not.toBeNull()
        expect(user?.username).toBe('test')
        expect(user?.email).toBe('test@mail.com')
        expect(user?.name).toBe('Test User')
        expect(user?.birthDate).toBe('1990-01-01')
        expect(user?.createdAt).not.toBeNull()
    })
})
