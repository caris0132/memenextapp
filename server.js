const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.use("/assets", express.static(__dirname + "/public/assets"));
    console.log(`__dirname`, __dirname);

    server.all('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})