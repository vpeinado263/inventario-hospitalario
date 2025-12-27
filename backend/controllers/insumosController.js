const sql = require("../database/dbConnection");

// GET /insumos
exports.getInsumos = async (req, res, next) => {
  try {
    const insumos = await sql`
      SELECT *
      FROM insumos
      ORDER BY created_at DESC
    `;

    res.status(200).json(insumos);
  } catch (error) {
    next(error);
  }
};

exports.createInsumo = async (req, res, next) => {
  try {
    const { name, quantity, comments } = req.body;

    if (!name || quantity === undefined) {
      return res.status(400).json({
        message: "El nombre y la cantidad son requeridos.",
      });
    }

    if (typeof quantity !== "number" || quantity < 0) {
      return res.status(400).json({
        message: "La cantidad debe ser un número válido.",
      });
    }

    const [created] = await sql`
      INSERT INTO insumos (name, quantity, comments)
      VALUES (${name.trim()}, ${quantity}, ${comments?.trim() || ""})
      RETURNING *
    `;

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

// POST /insumos
exports.createInsumo = async (req, res, next) => {
  try {
    const { name, quantity, comments } = req.body;

    if (!name || quantity === undefined) {
      return res.status(400).json({
        message: "El nombre y la cantidad son requeridos.",
      });
    }

    if (typeof quantity !== "number" || quantity < 0) {
      return res.status(400).json({
        message: "La cantidad debe ser un número válido.",
      });
    }

    const [created] = await sql`
      INSERT INTO insumos (name, quantity, comments)
      VALUES (${name.trim()}, ${quantity}, ${comments?.trim() || ""})
      RETURNING *
    `;

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

//  PUT /insumos/:id
exports.updateInsumo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity, comments } = req.body;

    const [updated] = await sql`
      UPDATE insumos
      SET
        name = ${name.trim()},
        quantity = ${quantity},
        comments = ${comments?.trim() || ""}
      WHERE id = ${id}
      RETURNING *
    `;

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

    const result = await sql`
      DELETE FROM insumos
      WHERE id = ${id}
    `;

    if (result.count === 0) {
      return res.status(404).json({ message: "Insumo no encontrado." });
    }

    res.status(200).json({
      message: "Insumo eliminado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};
