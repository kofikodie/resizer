import { User } from '../../repository/types'
import { UserBuilderInterface } from './user-builder-interface'

export class UserBuilder implements UserBuilderInterface {
    build(userData: any): User | null {
        if (!userData) {
            return null
        }

        return {
            id: userData.id,
            username: userData.username,
            name: userData.first_name + ' ' + userData.last_name,
            email: userData.email,
            birthDate: userData.date_of_birth,
            createdAt: userData.created_at,
        }
    }
}
