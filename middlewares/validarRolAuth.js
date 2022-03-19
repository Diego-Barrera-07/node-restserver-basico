const { response, request } = require('express');

const userAuthorized = async (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({ msg: 'Se quiere verificar el role sin validar el token primero' })
    }
    const { role, nombre } = req.user;
    if (role !== 'ADMIN_ROLE') {
        return res.status(500).json({ msg: 'No estás autorizado para hacer esto' })
    }
}
const rolesAuthorized = (...roles) => {
    console.log('Hola, me estoy ejecutando puto', roles)
    return (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({ msg: 'Se quiere verificar el role sin validar el token primero' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ msg: `El servicio requiere uno de estos roles: ${roles}` });
        }

        next()
    }
}

module.exports = { userAuthorized, rolesAuthorized }