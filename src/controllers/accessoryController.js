const router = require('express').Router()

router.get('/create', (req, res) => {
    res.render('accessories/create')
})


module.exports = router