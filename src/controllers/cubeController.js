const router = require('express').Router()
const cubeManager = require('../services/cubeManager')
const accessoryManager = require('../services/accessoryManager')

router.get('/create', (req, res) => {
    res.render('cube/create')
})

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body
    console.log(req.user);
    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user._id,
    })
    res.redirect('/')
})
router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeManager.getByIdWithAccessories(req.params.cubeId).lean()


    if (!cube) {
        return res.redirect('/404')
    } else {
        res.render('cube/details', { cube })
    }
})

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getById(req.params.cubeId).lean()
    const accessories = await accessoryManager.getOthers(cube.accessories).lean()
    const hasAccessories = accessories.length > 0
    res.render('accessories/attach', { cube, accessories, hasAccessories })
})

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const cubeId = req.params.cubeId
    const { accessory: accessoryId } = req.body
    await cubeManager.attachAccessory(cubeId, accessoryId)

    res.redirect(`/cubes/${cubeId}/details`)
})

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeManager.getById(req.params.cubeId).lean()
    console.log(cube);
    res.render('cube/delete', { cube })
})

module.exports = router