import { User } from './types'

export type Respository = {
    getUserByEmailAndPassword(
        email: string,
        password: string,
    ): Promise<User | null>
}

export type Connection = {
    connect(): Promise<void | ExecutableBase>
    end(options?: any): Promise<void>
}

export type ExecutableBase = {
    execute(sql: string, value: string[]): Promise<[any, unknown[]]>
}
