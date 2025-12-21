const mongoose = require("mongoose");
const Insumo = require("../models/insumo");

// GET /insumos
exports.getInsumos = async (req, res, next) => {
  try {
    const insumos = await Insumo.find().sort({ createdAt: -1 });
    res.status(200).json(insumos);
  } catch (error) {
    next(error);
  }
};

// POST /insumos
exports.createInsumo = async (req, res, next) => {
  try {
    const { name, quantity, comments } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({
        message: "El nombre y la cantidad son requeridos.",
      });
    }

    if (typeof quantity !== "number" || quantity < 0) {
      return res.status(400).json({
        message: "La cantidad debe ser un número válido.",
      });
    }

    const insumo = new Insumo({
      name: name.trim(),
      quantity,
      comments: comments?.trim() || "",
    });

    const saved = await insumo.save();

    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

// PUT /insumos/:id
exports.updateInsumo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity, comments } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    if (!name || !quantity) {
      return res.status(400).json({
        message: "El nombre y la cantidad son requeridos.",
      });
    }

    if (typeof quantity !== "number" || quantity < 0) {
      return res.status(400).json({
        message: "La cantidad debe ser un número válido.",
      });
    }

    const updated = await Insumo.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        quantity,
        comments: comments?.trim() || "",
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Insumo no encontrado." });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /insumos/:id
exports.deleteInsumo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const deleted = await Insumo.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Insumo no encontrado." });
    }

    res.status(200).json({ message: "Insumo eliminado correctamente." });
  } catch (error) {
    next(error);
  }
};
