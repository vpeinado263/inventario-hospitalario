const mongoose = require('mongoose');

const insumoSchema = new mongoose.insumoSchema({
    name: {
        type: string,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Insumo', insumoSchema);