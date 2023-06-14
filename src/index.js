const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const routes = require('./routes')
const dbConnect = require('./config/dbConfig')
const app = express()

const PORT = 3000
require('./config/expressConfig')(app)
require('./config/hbsConfig')(app)

dbConnect()
    .then(() => console.log('db connected successfuly'))
    .catch(err => console.log(err))

app.use(routes)

app.listen(PORT, () => console.log('Server is listening on port ' + PORT))