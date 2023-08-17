import { JwtServiceInterface } from './jwt-service-interface'
import * as jose from 'jose'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

export class JwtService implements JwtServiceInterface {
    async signToken(userId: number): Promise<string> {
        if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRATION_TIME || !process.env.JWT_ISSUER || !process.env.JWT_AUDIENCE) {
            throw new Error('JWT environment variables not set')
        }

        const secretKey = crypto.createSecretKey(
            process.env.JWT_SECRET,
            'utf-8',
        )

        const token = await new jose.SignJWT({ id: userId })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setIssuer(process.env.JWT_ISSUER ?? '')
            .setAudience(process.env.JWT_AUDIENCE ?? '')
            .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
            .sign(secretKey)

        return token
    }
}
