const Insumo = require("../models/insumo");

exports.getInsumos = async (req, res, next) => {
  try {
    const insumos = await Insumo.find();
    res.status(200).json(insumos);
  } catch (error) {
    next(error);
  }
};

exports.createInsumo = async (req, res, next) => {
  const { name, quantity, comments } = req.body;

  if (!name || !quantity) {
    return res
      .status(400)
      .json({ message: "El nombre y la cantidad son requeridos." });
  }

  const insumo = new Insumo({ name, quantity, comments });

  try {
    await insumo.save();
    res.status(201).json(insumo);
  } catch (error) {
    next(error);
  }
};

exports.updateInsumo = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity, comments } = req.body;

  if (!name || !quantity) {
    return res
      .status(400)
      .json({ message: "El nombre y la cantidad son requeridos." });
  }

  try {
    const updatedInsumo = await Insumo.findByIdAndUpdate(
      id,
      { name, quantity, comments },
      { new: true },
    );

    if (!updatedInsumo) {
      return res.status(404).json({ message: "Insumo no encontrado." });
    }

    res.status(200).json(updatedInsumo);
  } catch (error) {
    next(error);
  }
};

exports.deleteInsumo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const insumo = await Insumo.findById(id);

    if (!insumo) {
      return res.status(404).json({ message: "Insumo no encontrado." });
    }

    await insumo.remove();
    res.status(200).json({ message: "Insumo eliminado correctamente." });
  } catch (error) {
    next(error);
  }
};
