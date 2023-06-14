const { log } = require('console')

const router = require('express').Router()

router.get('/create', (req, res) => {
    res.render('accessories/create')
})

router.post('/create', (req, res) => {
    const body = req.body
    log(body)
    res.redirect('/')
})

module.exports = router