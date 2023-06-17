const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.register = (userData) => User.create(userData)

exports.login = async (username, password) => {
    //todo check if user exists
    const user = await User.findOne({ username })

    if(!user){
        throw new Error('Cannot find username or password')
    }
    //validate password
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
        throw new Error('Cannot find username or password')
    }
    //return user
    return user
}