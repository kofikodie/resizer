import mysql from 'mysql2/promise'
import { Connection } from './mysql-connection-interface'

export default class MysqlConnection implements Connection {
    private connection!: mysql.Connection

    async execute(query: string, params?: any[]): Promise<any> {
        const [rows, fields] = await this.connection.execute(query, params)
        return rows
    }

    async close(): Promise<void> {
        await this.connection.end()
    }

    async connect(): Promise<mysql.Connection> {
        return (this.connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        }))
    }
}
