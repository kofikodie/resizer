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

        console.log(response)
        assert(response.body.kind === 'single')
        expect(response.body.singleResult.errors).toBeUndefined()
        expect(response.body.singleResult.data?.hello).toBe('Hello world!')
    })
})
