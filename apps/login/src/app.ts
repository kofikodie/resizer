import express from 'express'
import routerV1 from './v1'
import e from 'express'

const app = express()

app.use(express.json())

app.use('/api/v1', routerV1)

app.get('/health', (req, res) => {
    res.send('OK')
})

export default app
