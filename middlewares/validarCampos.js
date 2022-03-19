const { validationResult } = require('express-validator')

// Validacion del resultado del check de exprees-validator
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next()
}

module.exports =  validarCampos 