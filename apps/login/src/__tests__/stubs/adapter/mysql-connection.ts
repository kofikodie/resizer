import { Connection } from '../../../adapter/mysql-connection-interface'

export class MysqlConnectionStub implements Connection {
    connect(): Promise<any> {
        return Promise.resolve(
            console.log('DatabaseConnection.connect() called'),
        )
    }
    close(): Promise<void> {
        return Promise.resolve(console.log('DatabaseConnection.close() called'))
    }

    execute(query: string, values: string[]): Promise<any> {
        if (values.includes('invalid-email')) {
            return Promise.resolve([])
        }

        return Promise.resolve([
            {
                id: 1,
                username: 'john',
                email: 'valid-email@mail.com',
                first_name: 'John',
                last_name: 'Doe',
                date_of_birth: '1990-01-01',
                created_at: '2020-01-01',
                updated_at: '2020-01-01',
                password_salt:
                    'Yaj+htJ5jekvDQJvabbLRSMvEGdVMU9PYiS72tBfVPja63FDQbbzFxGHCrc9Yj/gvd9XbgsD4etkjI2a9RXmZ+F5/ePsRtOH7prK3zKmaSNgpS5npM4fjGILOmudmjWMRVsTyJxDUrNh9Y59kQYIrGo5VG3TPyGsjzrSlsm2AQ8=',
                password_hash:
                    '2cb01b11637b02e43fe1ea822f4078f306ccfa388881f7b5aeb12c859eaa2a946086d7e6a64e281bc98ac53843c415cb324043649d986bf7a408eebe37f2f46e',
            },
            ,
        ])
    }
}
