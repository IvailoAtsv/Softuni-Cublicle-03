const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt')
const User = require('../models/User')

const secret = '89b95444d706fbad8da71444ad2df28a576f7b4eeb89cff2d12f18f27700b24b'

exports.register = (userData) => User.create(userData)

exports.login = async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) {
        throw new Error('Cannot find username or password')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Cannot find username or password')
    }

    const payload = {
        _id: user.__id,
        username: user.username
    }
    const token = jwt.sign(payload, secret, {expiresIn: '2d'})

    return token
}