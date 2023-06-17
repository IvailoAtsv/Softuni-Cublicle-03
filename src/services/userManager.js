const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt')
const User = require('../models/User')
const { secret } = require('../config/config')


exports.register = (userData) => User.create(userData)

exports.login = async (username, password) => {
    const user = await User.findOne({ username })
    console.log(user);

    if (!user) {
        throw new Error('Cannot find username or password')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Cannot find username or password')
    }

    const payload = {
        _id: user._id,
        username: user.username
    }
    const token = jwt.sign(payload, secret, {expiresIn: '2d'})

    return token
}