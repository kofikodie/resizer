import { UserBuilder } from '../../builder/user/user-builder'
import { DatabaseRepository } from '../../repository/database-repository'
import { PasswordService } from '../../service/password-service'
import { MysqlConnectionStub } from '../../helplers/stubs/adapter/mysql-connection'

describe('Database Respository', () => {
    it('should return null when user is not found', async () => {
        const connection = new DatabaseRepository(
            new MysqlConnectionStub(),
            new UserBuilder(),
            new PasswordService(),
        )

        const user = await connection.getUserByEmailAndPassword(
            'invalid-email',
            'invalid-password',
        )

        expect(user).toBeNull()
    })

    it('should return user when user is found', async () => {
        const connection = new DatabaseRepository(
            new MysqlConnectionStub(),
            new UserBuilder(),
            new PasswordService(),
        )

        const user = await connection.getUserByEmailAndPassword(
            'valid-email@mail.com',
            '1',
        )

        expect(user).not.toBeNull()
        expect(user?.username).toBe('john')
        expect(user?.email).toBe('valid-email@mail.com')
        expect(user?.name).toBe('John Doe')
        expect(user?.birthDate).toBe('1990-01-01')
        expect(user?.createdAt).toBe('2020-01-01')
    })
})
