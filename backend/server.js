require('dotenv').config();
const app = require('./app');
const { initDatabase, testConnection } = require('./database/db');

const PORT = process.env.PORT || 5001;

// Al inicio del servidor
const startServer = async () => {
  try {
    await testConnection();
    await initDatabase();
    
    // El resto de su código del servidor...
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();