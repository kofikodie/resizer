export const typeDefs = `
    type HealthResponse {
        message: String!
    }

    type Query {
        health: HealthResponse!
    }
`
