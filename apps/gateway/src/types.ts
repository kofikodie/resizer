export const typeDefs = `
    type HealthResponse {
        message: String!
    }

    type Query {
        health: HealthResponse!
    }

    type Query {
        login(email: String!, password: String!): String!
    }
`
