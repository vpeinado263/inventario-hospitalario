const mongoose = require('mongoose');

const insumoSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
});

const Insumo = mongoose.model('Insumo', insumoSchema);

module.exports = Insumo;
