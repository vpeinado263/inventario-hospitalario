const supabase = require("../database/dbConnection");

// GET
exports.getInsumos = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("insumos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// POST
exports.createInsumo = async (req, res, next) => {
  try {
    const { name, quantity, comments } = req.body;

    if (!name || quantity === undefined) {
      return res.status(400).json({
        message: "Nombre y cantidad son requeridos.",
      });
    }

    const { data, error } = await supabase
      .from("insumos")
      .insert([
        {
          name: name.trim(),
          quantity,
          comments: comments?.trim() || "",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

// PUT 
exports.updateInsumo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity, comments } = req.body;

    if (!name || quantity === undefined) {
      return res.status(400).json({
        message: "El nombre y la cantidad son requeridos.",
      });
    }

    const { data, error } = await supabase
      .from("insumos")
      .update({
        name: name.trim(),
        quantity,
        comments: comments?.trim() || "",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: "Insumo no encontrado." });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// DELETE 
exports.deleteInsumo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("insumos").delete().eq("id", id);

    if (error) throw error;

    res.status(200).json({
      message: "Insumo eliminado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};
