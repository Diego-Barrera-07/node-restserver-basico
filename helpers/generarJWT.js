const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '12H'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
                throw new Error('hay un error');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = { generarJWT }