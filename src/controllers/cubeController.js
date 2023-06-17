const router = require('express').Router()
const cubeManager = require('../services/cubeManager')
const accessoryManager = require('../services/accessoryManager')
const { generateDifficultyOptions } = require('../utils/helpers')
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
    }
        const isOwner = cube.owner == req.user._id
        console.log(isOwner);
        res.render('cube/details', { cube, isOwner })
    

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
    const options = generateDifficultyOptions(cube.difficultyLevel)
    res.render('cube/delete', { cube, options })
})
router.post('/:cubeId/delete', async (req, res) => {
    await cubeManager.delete(req.params.cubeId)

    res.redirect('/')
})

router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeManager.getById(req.params.cubeId).lean()
    const options = generateDifficultyOptions(cube.difficultyLevel)
    res.render('cube/edit', { cube, options })
})
router.post('/:cubeId/edit', async (req, res) => {
    const cubeData = req.body

    await cubeManager.update(req.params.cubeId, cubeData)

    res.redirect(`/cubes/${req.params.cubeId}/details`)
})
module.exports = router