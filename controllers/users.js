const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const usuariosGet = async (req = request, res = response) => {
    // const query = req.query
    // const { q = 'no query', nombre } = query
    const { limit = 5, since = 1 } = req.query
    // Recuerda no poner{} en find si quieres todos los usarios, si necesitas solo
    // los que cumplan cierta condición hazlo así:
    // const users = await User.find({ estado: true })
    //     .skip(Number(since))
    //     .limit(Number(limit));
    // const userLength = await User.countDocuments({ estado: true })
    // Esta es una optimización del código de arriba para que se ejecuten al tiempo
    const query = {estado: true}
    const [ userLength, limitQuery] = await Promise.all([
        User.count(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number(limit))

    ])

res.json({
    msg: 'LISTADO DE USUARIOS',
    userLength,
    limitQuery
})
}
const usuariosPost = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    // Encriptar la contraeña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    // Guardar en la DB
    await user.save();
    res.json({
        msg: "Enviado correctamente por Post a la DB",
        user
    })
}
const usuariosPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, google, email, ...resto } = req.body
    // Validacion
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const userDB = await User.findByIdAndUpdate(id, resto)
    res.json({
        msg: "Actualizando datos",
        userDB
    })
}
const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: "patch Api"
    })
}
const usuariosDelete = async(req = request, res = response) => {
    const {id} = req.params
    const uid = req.uid;
    const userAuthorized = req.user;
    // Eliminar físicamente - no recomendado ahora
    // const user = await User.findByIdAndDelete(id)
    // Eliminación recomendada, cambio de estado en la base de datos
    const userStatus = await User.findByIdAndUpdate(id, {estado: false})

    res.json({
        msg: "Delete user",
        userAuthorized,
        userStatus,
        uid
    })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}