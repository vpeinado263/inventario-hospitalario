const app = require('./app');
const connectDB = require('./database/dbConnection');
const insumosRoutes = require('./');

const startServer = async () => {
    try {
        await connectDB();

        const port = process.env.PORT || 5001 ;
        const server = app.listen(port, () => {
            console.log(`Servidor funcionando en http://localhost:${port}`);
        });

    app.use('/api/insumos', insumosRoutes);

    process.on('SIGINT', () => {
        console.log('Cerrado el Servidor...');
        server.close(() => {
            console.log('Servidor cerrado correctamente');
            process.exit(0);
        });
    });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
    }
};

startServer();
