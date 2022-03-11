const Role = require('../models/role')
const User = require('../models/user')
const roleValidation = async (role = '') => {
    const existRole = await Role.findOne({ role })
    if (!existRole) {
        throw new Error('No existe este rol en la base de datos')
    }
}

const emailValidation = async (email = '') => {
    // verificar existencia del correo existe
    const existEmail = await User.findOne({ email })
    if (existEmail) {
        throw new Error('Este correo ya existe')
    }
}
const idValidation = async (id) => {
    const existId = await User.findById(id)
    if (!existId) {
        throw new Error('No existe este rol en la base de datos')
    }
}
module.exports = { roleValidation, emailValidation, idValidation }