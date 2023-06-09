const router = require('express').Router()
const cubeManager = require('../services/cubeManager')

router.get('/create', (req, res) => {
    console.log(cubeManager.getAll())
    res.render('create')
})

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body
    cubeManager.create({name, description, imageUrl, difficultyLevel : Number(difficultyLevel)})
    res.redirect('/')
})
router.get('/:cubeId/details', (req, res) => {
    const cube = cubeManager.getById(req.params.cubeId)
    if(!cube){
        return res.redirect('/404')
    }else{
        res.render('details', { cube })
    }
})

module.exports = router