const { log } = require('console')
const accessoryManager = require('../services/accessoryManager')
const router = require('express').Router()

router.get('/create', (req, res) => {
    res.render('accessories/create')
})

router.post('/create', async (req, res) => {
    const { name, description, imageUrl } = req.body
    await accessoryManager.create({ name, description, imageUrl })
    res.redirect('/')
})

module.exports = router