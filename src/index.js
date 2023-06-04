const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const homeController = require('./controllers/homeController')
const cubeController = require('./controllers/cubeController')

const app = express()
const PORT = 3000

require('./config/expressConfig')(app)
require('./config/hbsConfig')(app)

app.use(homeController)
app.use('/cubes', cubeController)

app.listen(PORT, () => console.log('Server is listening on port ' + PORT))