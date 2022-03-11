const { Schema, model } = require('mongoose')

const userSchema = Schema({
    name: {
        type: String,
        required: (true, 'El nombre es obligatori')
    },
    email: {
        type: String,
        required: (true, 'El correo es obligatorio'),
        unique: true
    },
    password: {
        type: String,
        required: (true, 'Es obligatorio')
    },
    imgProfile: {
        type: String
    },
    role: {
        type: String,
        required: (true, 'Es requerido el rol'),
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    googleSing: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject();
    return user
}
module.exports = model( 'User', userSchema )