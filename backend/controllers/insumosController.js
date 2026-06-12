const { pool } = require('../database/db');

const getInsumos = async (req, res) => {
  try {
    // Consulta directa sin función almacenada (más confiable)
    const { rows } = await pool.query("SELECT * FROM insumos ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    console.error('Error en getInsumos:', error);
    res.status(500).json({ error: 'Error al obtener los insumos' });
  }
};

const createInsumo = async (req, res) => {
  try {
    const { name, quantity, comments } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO insumos (name, quantity, comments) VALUES ($1, $2, $3) RETURNING *",
      [name, quantity, comments]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error en createInsumo:', error);
    res.status(500).json({ error: 'Error al crear el insumo' });
  }
};

const updateInsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, comments } = req.body;
    const { rows } = await pool.query(
      "UPDATE insumos SET name = $1, quantity = $2, comments = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [name, quantity, comments, id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error en updateInsumo:', error);
    res.status(500).json({ error: 'Error al actualizar el insumo' });
  }
};

const deleteInsumo = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM insumos WHERE id = $1", [id]);
    res.json({ message: "Insumo eliminado correctamente." });
  } catch (error) {
    console.error('Error en deleteInsumo:', error);
    res.status(500).json({ error: 'Error al eliminar el insumo' });
  }
};

module.exports = {
  getInsumos,
  createInsumo,
  updateInsumo,
  deleteInsumo
};