
const validaCampos  = require('../middlewares/validarCampos');
const  validaJwt  = require('../middlewares/validar-jwt');
const  validaRoles  = require('../middlewares/validarRolAuth');

module.exports = {
    ...validaCampos,
    ...validaJwt,
    ...validaRoles,
}