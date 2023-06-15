const router = require('express').Router()
const cubeManager = require('../services/cubeManager')
const accessoryManager = require('../services/accessoryManager')

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

    if (!cube) {
        return res.redirect('/404')
    } else {
        res.render('details', { cube })
    }
})

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getById(req.params.cubeId).lean()
    const accessories = await accessoryManager.getAll().lean()
    const hasAccessories = accessories.length > 0
    res.render('accessories/attach', { cube, accessories, hasAccessories })
})
router.post('/:cubeId/attach-accessory', async (req, res) => {
    const cubeId = req.params.cubeId
    const { accessory:accessoryId } = req.body
    console.log(accessoryId);
    await cubeManager.attachAccessory(cubeId, accessoryId)

    res.redirect(`/cubes/${cubeId}/details`)
})
module.exports = router