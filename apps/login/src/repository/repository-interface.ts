import { User } from './types'

export interface Respository {
    getUserByEmailAndPassword(
        email: string,
        password: string,
    ): Promise<User | null>
}

export interface Connection {
    connect(): Promise<void | ExecutableBase>
    end(options?: any): Promise<void>
}

export type ExecutableBase = {
    execute(sql: string, value: string[]): Promise<[any, unknown[]]>
}
