const uniqid = require('uniqid')

const cubes = []

exports.getAll = () => cubes.slice()

exports.create = function (cubeData) {
    const newCube = {
        id: uniqid(),
        ...cubeData
    }
    cubes.push(newCube)

    return newCube
}
exports.getById = (cubeId) => cubes.find(x => x.id == cubeId)