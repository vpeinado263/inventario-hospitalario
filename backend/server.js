const app = require("./app");
const sql = require("./database/dbConnection");

const startServer = async () => {
  try {
    await sql`SELECT 1`;

    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Servidor funcionando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();
