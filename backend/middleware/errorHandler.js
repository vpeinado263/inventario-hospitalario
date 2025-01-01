const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message || 'Error desconocido'}`);
    console.log(`Stack trace: ${err.stack}`);

    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Algo salió mal en el servidor';

    res.status(statusCode).json({
        success: false,
        error: errorMessage
    });
};

module.exports = errorHandler;