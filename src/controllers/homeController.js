const router = require('express').Router()
const cubeManager = require('../services/cubeManager')

router.get('/', (req, res) => {
    const cubes = cubeManager.getAll()
    res.render('index', { cubes })
})

router.get('/about', (req, res) => {
    res.render('about')
})



module.exports = router