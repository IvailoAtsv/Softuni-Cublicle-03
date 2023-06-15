const uniqid = require('uniqid')
const Cube = require('../models/Cube')

exports.getAll = async (search, from, to) => {
    let result = await Cube.find().lean();


    //todo: db filtering
    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (from) {
        result = result.filter(cube => cube.difficultyLevel >= Number(from))
    }

    if (to) {
        result = result.filter(cube => cube.difficultyLevel <= Number(from))

    }
    return result
}


exports.getById = (cubeId) => Cube.findById(cubeId)

exports.create = async (cubeData) => {
    const cube = new Cube(cubeData)

    await cube.save();

    return cube
}
exports.attachAccessory = async (cubeId, accessoryId) => {
    // console.log(cubeId);
    // console.log(accessoryId);
    return Cube.findByIdAndUpdate(cubeId,{$push : {accessories:accessoryId}})
  
}