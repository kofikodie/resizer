import express, { Request, Response } from 'express'
import { UserRequest } from './types'
import { DatabaseRepository } from '../repository/database-repository'
import { UserBuilder } from '../builder/user/user-builder'
import { PasswordService } from '../service/password-service'
import { JwtService } from '../service/jwt-service'
import dotenv from 'dotenv'
import MysqlConnection from '../adapter/mysql-connection'
dotenv.config()

const router = express.Router()
router.post(
    '/login',
    async (
        req: Request<unknown, unknown, UserRequest, unknown>,
        res: Response,
    ) => {
        if (!req.body.email || !req.body.password) {
            res.status(400).send('Missing username or password')
            return
        }

        const repository = new DatabaseRepository(
            new MysqlConnection(),
            new UserBuilder(),
            new PasswordService(),
        )

        const user = await repository.getUserByEmailAndPassword(
            req.body.email,
            req.body.password,
        )

        if (!user) {
            res.status(401).send({
                message: 'Invalid username or password',
            })
            return
        }

        const token = await new JwtService().signToken(user.id)

        res.status(200).send({ token })
        return
    },
)

export default router
