import { ApolloServer } from '@apollo/server'
import { typeDefs } from '../src/types'
import assert from 'node:assert'
import { resolvers } from '../src/resolver/query'

describe('e2e test suite', () => {
    it('returns OK with for HEALTH query', async () => {
        const testServer = new ApolloServer({
            typeDefs,
            resolvers,
        })

        const response = await testServer.executeOperation({
            query: 'query Health { health{ message} }',
        })

        assert(response.body.kind === 'single')
        expect(response.body.singleResult.errors).toBeUndefined()
        expect(JSON.stringify(response.body.singleResult.data?.health)).toBe(
            JSON.stringify({ message: 'OK' }),
        )
    })

    it('return valid token for LOGIN query', async () => {
        const testServer = new ApolloServer({
            typeDefs,
            resolvers,
        })

        const response = await testServer.executeOperation({
            query: 'query Login($email: String!, $password: String!) { login(email: $email, password: $password) }',
            variables: { email: 'bobmarley@resizer.com' , password: '1' },
        })

        assert(response.body.kind === 'single')
        expect(response.body.singleResult.errors).toBeUndefined()
        expect(response.body.singleResult.data?.login).toBeDefined()
    })
})
