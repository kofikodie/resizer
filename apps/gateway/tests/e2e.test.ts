import { ApolloServer } from '@apollo/server'
import { typeDefs } from '../src/types'
import { resolvers } from '../src/resolver/query/health'
import assert from 'node:assert'

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
})
