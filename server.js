const express = require('express')
const app = express()
const { resolve } = require('path')
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.static('./build'))

app.all('/*', (req, res) => {
    res.sendFile(resolve(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})
