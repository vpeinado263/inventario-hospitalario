const express = require("express");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");
const logRequest = require("./middleware/logRequest");
const insumosRoutes = require("./routes/insumosRoutes");

const app = express();

// Middleware global
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(logRequest);

// Solo activar sesiones si realmente las usás
if (process.env.USE_SESSION === "true") {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "defaultsecret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false, // Cambiar a true si usás HTTPS
        maxAge: 1000 * 60 * 60, // 1 hora
      },
    }),
  );
}

// Rutas principales
app.use("/insumos", insumosRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Insumo!" });
});

// 404 - Not Found en formato JSON
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

// Manejo de errores
app.use(errorHandler);

module.exports = app;
