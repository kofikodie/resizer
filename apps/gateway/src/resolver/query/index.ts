import { health } from './health'
import { login } from './login'

export const resolvers = {
    ...health,
    ...login,
}
