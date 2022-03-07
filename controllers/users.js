const { response } = require('express')

const usuariosGet = (req, res) => {
    const query = req.query
    const {q='no query', nombre} = query
    res.json({
        msg: 'Get API - Contoller',
        q,
        nombre
    })
}
const usuariosPut = (req, res) => {
    const  id  = req.params.id;
    res.status(400).json({
        msg: "get Api",
        id
    })
}
const usuariosPost = (req, res) => {
    const body = req.body;
    const { nombre, id } = body
    res.status(201).json({
        msg: "post Api",
        nombre,
        id
    })
}
const usuariosPatch = (req, res) => {
    res.json({
        msg: "patch Api"
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: "Delete Api"
    })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}