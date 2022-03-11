const mongoose = require('mongoose');

const dbConnection = async () => {
    const tryToConnect = 'mongodb+srv://diegobarrera07:4bx1TrEXVYUpi0s4@cafenodedb.w0ome.mongodb.net/cafeDB'
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION || tryToConnect, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('database connection established')
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos')
    }
}

module.exports =  dbConnection 