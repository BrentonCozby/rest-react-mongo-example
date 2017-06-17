const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { apiRouter } = require('./routes.js')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000


// ROUTES FOR OUR API
// =============================================================================
const router = express.Router() // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({message: 'Welcome to the homepage'})
})

app.use('/', router)


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter)

// START THE SERVER
// =============================================================================
app.listen(port, () => {
    console.log('Magic happens on port ' + port)
})
