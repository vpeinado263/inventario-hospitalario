const logRequest = (req, res, next) => {
    const currentTime = new Date().toLocaleDateString();
    console.log(`[${currentTime}] - solicitud recibida: ${req.method} ${req.url}`);
    next();
};

module.exports = logRequest;