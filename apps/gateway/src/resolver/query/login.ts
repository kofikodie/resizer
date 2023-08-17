import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export const login = {
    Query: {
        login: async (
            parent: any,
            args: { email: string; password: string },
        ) => {
            console.log('login resolver')
            const { email, password } = args
            if (!process.env.LOGIN_SERVICE) {
                throw new Error('LOGIN_SERVICE is not defined')
            }

            console.log('LOGIN_SERVICE', process.env.LOGIN_SERVICE_BASE_URI)
            try {
                const { data } = await axios.post<{ token: string }>(
                    `${process.env.LOGIN_SERVICE}/api/v1/login`,
                    {
                        email,
                        password,
                    },
                )

                if (!data.token) {
                    throw new Error('login failed')
                }

                return data.token
            } catch (error) {
                console.log('error', error)
                throw new Error('login failed')
            }
        },
    },
}
