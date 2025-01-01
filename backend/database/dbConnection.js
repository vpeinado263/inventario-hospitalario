const mongoose = require('mongoose');
require('dotenv').config();

const conectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Conexión exitosa a la base de Datos');
    } catch (error) {
        console.error('Error al establecer conexión ala Base de Datos', error.message);
        throw error;
    }
};

module.exports = connectDB;