export const resolvers = {
    Query: {
        health: () => {
            return {
                message: 'OK',
            }
        },
    },
}
