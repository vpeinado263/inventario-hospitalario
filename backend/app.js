const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");
const logRequest = require("./middleware/logRequest");
const insumosRoutes = require("./routes/insumosRoutes");

const app = express();

// Middleware global
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://inventario-hospitalario.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(logRequest);

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
