const app = require("./app");
const connectDB = require("./database/dbConnection");
const insumosRoutes = require("./routes/insumosRoutes");

const startServer = async () => {
  try {
    await connectDB();

    // Primero usa las rutas
    app.use("/api/insumos", insumosRoutes);

    // Luego inicia el servidor
    const port = process.env.PORT || 5001;
    const server = app.listen(port, () => {
      console.log(`Servidor funcionando en http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
  }
};

startServer();
