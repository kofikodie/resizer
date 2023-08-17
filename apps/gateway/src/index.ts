import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './types'
import { resolvers } from './resolver/query'

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 8888 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}graphql`))
