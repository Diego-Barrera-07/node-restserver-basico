const bcryptjs = require('bcryptjs');

const { response } = require('express')
const User = require('../models/user')

const { generarJWT } = require('../helpers/generarJWT')

const login = async (req, res = response) => {
    const { email, password } = req.body

    try {
        // verificar existencia de email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario no encontrado - Email'
            })
        }
        // verificar si el usuario está activo
        if (!user.estado) {
            return res.status(400).json({
                msg: 'Usuario no encontrado - Eliminado'
            })
        }
        // Verificar contraseña 
        const passwordValidation = bcryptjs.compareSync(password, user.password);
        if (!passwordValidation) {
            return res.status(400).json({
                msg: 'Error - Contraseña incorrecta'
            })
        }
        // Generar JWT
        const token = await generarJWT(user.id);

        res.json({
            msg: "Ya se ha generado JWT",
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal o habla con el administrador'
        })
    }
}

module.exports = { login }