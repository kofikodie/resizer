import app from './app'

;(async () => {
    const port = process.env.PORT ?? 8889
    app.listen(port, () => {
        console.log(`🚀 Listening on port ${port}`)
    })
})()
