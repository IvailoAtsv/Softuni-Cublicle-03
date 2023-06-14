const router = require('express').Router()
const cubeManager = require('../services/cubeManager')

router.get('/create', (req, res) => {
    console.log(cubeManager.getAll())
    res.render('create')
})

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body
    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel)
    })
    res.redirect('/')
})
router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeManager.getById(req.params.cubeId).lean()
    console.log(cube);
    if (!cube) {
        return res.redirect('/404')
    } else {
        res.render('details', { cube })
    }
})

module.exports = router