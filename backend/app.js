const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const session = require('express-session');
const errorHandler = require('./middleware/errorHandler');
const logRequest = require('./middleware/logRequest');
const insumosRoutes = require('./routes/insumosRoutes');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use(logRequest);
app.use(errorHandler);

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true,
}));

app.use('/', (req, res) => {
    res.send('Bienvenido a la API de Insumo!');
});

app.use((req, res, next) => {
    res.status(404).send('404 - Pàgina no encontrada');
});

module.exports = app;