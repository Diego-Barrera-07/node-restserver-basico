const { response, request } = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validarJwt = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' })
    }
    console.log(token)
    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY)
        const user = await User.findById(uid)
        // Verificar si uid está eliminado 
        if(!user){
            res.status(401).json({ msg: 'Este usuario no existe' })
        }
        if (!user.estado) {
            res.status(401).json({ msg: 'Este token no es valido - Eliminado' })
        }
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: 'Token no valido' })
    };
}

module.exports = { validarJwt }