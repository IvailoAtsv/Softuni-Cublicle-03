const path = require('path')
const express = require('express')
const cookieparser = require('cookie-parser')
const { auth } = require('../middlewares/authMiddleware')

function expressConfig(app){
    app.use(express.static(path.resolve(__dirname, '..', 'public')))
    app.use(express.urlencoded({extended:false}))
    app.use(cookieparser())
    app.use(auth)
}

module.exports = expressConfig