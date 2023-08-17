import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export const login = {
    login: async (parent: unknown, args: { email: string; password: string }) => {
        const { email, password } = args
        if (!process.env.LOGIN_SERVICE_BASE_URI) {
            throw new Error('LOGIN_SERVICE is not defined')
        }

        try {
            const { data } = await axios.post<{ token: string }>(
                `${process.env.LOGIN_SERVICE_BASE_URI}/api/v1/login`,
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
}
