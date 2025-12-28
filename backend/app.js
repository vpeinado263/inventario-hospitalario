const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");
const logRequest = require("./middleware/logRequest");
const insumosRoutes = require("./routes/insumosRoutes");

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://8va-tarea-react-next-js.vercel.app",
];


// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS no permitido para este origen"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(logRequest);

// RUTAS
app.use("/insumos", insumosRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Insumo!" });
});

// 404 
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

// Manejo de errores
app.use(errorHandler);

module.exports = app;
