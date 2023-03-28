const express = require('express')
const app = express()

require('dotenv').config()
require('./db/db')

const port = process.env.PORT || 3000

const pictureRouter = require('./routes/Index')

app.use('/pictures', pictureRouter)

app.listen(port, () => {
    console.log(`O servidor esta online na porta: ${port}`)
})