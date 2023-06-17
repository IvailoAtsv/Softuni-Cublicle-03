const jsonwebtoken = require('jsonwebtoken')
const utils = require('util')

const jwt ={
    sign: utils.promisify(jsonwebtoken.sign),
    verify: utils.promisify(jsonwebtoken.verify),
}
module.exports = jwt