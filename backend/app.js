const express = require("express");
const path = require("path");
const session = require("express-session");
const errorHandler = require("./middleware/errorHandler");
const logRequest = require("./middleware/logRequest");
const insumosRoutes = require("./routes/insumosRoutes");
const cors = require("cors");
const app = express();
require("dotenv").config();

//global
app.use(cors());
app.use(express.json());
app.use(logRequest);

//Sessiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
  }),
);

//Rutas
app.use("/insumos", insumosRoutes);
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Insumo!");
});

//Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).send("404 - Pàgina no encontrada");
});

//Errores generales
app.use(errorHandler);

module.exports = app;
