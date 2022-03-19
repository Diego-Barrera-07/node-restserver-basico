const { Router } = require('express');
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validar-jwt')
const { userAuthorized, rolesAuthorized } = require('../middlewares/validarRolAuth')
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut, usuariosPatch } = require('../controllers/users')
const { roleValidation, emailValidation, idValidation } = require('../helpers/db-validators')
const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'ID no es valido por MONGODB').isMongoId(),
    check('id').custom(idValidation),
    check('role').custom(roleValidation),
    validarCampos
], usuariosPut);
router.post('/', [
    check('name', '---- El nombre es obligatorio -----').not().isEmpty(),
    check('email').custom(emailValidation),
    check('password', '---- La contraseña no es válida, debe al menos ser de seis letras -----').isLength({ min: 6 }),
    check('role').custom(roleValidation),
    validarCampos
], usuariosPost);
router.delete('/:id', [
    validarJwt,
    // userAuthorized,
    rolesAuthorized('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'ID no es valido por MONGODB').isMongoId(),
    check('id').custom(idValidation),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch)

module.exports = router;