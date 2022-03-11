const {Schema, model} =  require('mongoose')

const Roleschema = Schema({
    role:{
        type: String,
        required: [true, 'El rol esa obligatorio']
    }
})

module.exports = model('role', Roleschema)