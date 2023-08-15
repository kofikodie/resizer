import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './resolver/query/health'
import { typeDefs } from './types'

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 8888 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}graphql`))
