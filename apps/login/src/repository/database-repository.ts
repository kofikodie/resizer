import { Respository } from './repository-interface'
import { User } from './types'
import { UserBuilderInterface } from '../builder/user/user-builder-interface'
import { PasswordServiceInterface } from '../service/password-service-interface'
import { Connection } from '../adapter/mysql-connection-interface'

export class DatabaseRepository implements Respository {
    constructor(
        private readonly connection: Connection,
        private readonly userBuilder: UserBuilderInterface,
        private readonly passwordService: PasswordServiceInterface,
    ) {}

    //private async connect(): Promise<Connection> {
    //    const connection = await mysql.createConnection({
    //        host: process.env.MYSQL_HOST,
    //        user: process.env.MYSQL_USER,
    //        password: process.env.MYSQL_PASSWORD,
    //        database: process.env.MYSQL_DATABASE,
    //    })
    //
    //    return connection
    //}

    //async getUserByEmailAndPassword(
    //    email: string,
    //    password: string,
    //): Promise<User | null> {
    //    const hashedPassword = this.passwordService.encryptPassword(password)
    //    const connection = await this.connect()
    //    const [rows] = await connection.execute(
    //        'SELECT * FROM users WHERE email = ? AND password = ?',
    //        [email, hashedPassword],
    //    )
    //    connection.end()
    //
    //    return this.userBuilder.build(rows[0])
    //}

    async getUserByEmailAndPassword(
        email: string,
        password: string,
    ): Promise<User | null> {
        try {
            await this.connection.connect()
            const rows = await this.connection.execute(
                'SELECT * FROM users WHERE email = ?',
                [email],
            )

            if (!rows[0]) {
                return null
            }

            const isPasswordValid = this.passwordService.comparePassword(
                password,
                {
                    hash: rows[0].password_hash,
                    salt: rows[0].password_salt,
                },
            )

            if (!isPasswordValid) {
                return null
            }

            this.connection.close()

            return this.userBuilder.build(rows[0])
        } catch (error) {
            console.log('error', error)
            return null
        }
    }
}
