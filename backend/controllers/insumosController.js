const Insumo = require('../models/insumo');

exports.getInsumos = async (req, res) => {
    try {
        const insumos = await Insumo.find();
        res.status(200).json(insumos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createInsumo = async (req, res) => {
    const { name, quantity, comments } = req.body;
    const insumo = new Insumo({
        name,
        quantity,
        comments,
    });
    try {
        await insumo.save();
        res.status(201).json(insumo);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

exports.updateInsumo = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, comments } = req.body;

    try {
        const updateInsumo = await Insumo.findByIdAndUpdate(
            id,
            { name, quantity, comments },
            { new: true }
        );
        res.status(200).json(updateInsumo);
    } catch (error) {
        res.status(400).json({ message: error.messsage });
    }
};

exports.deleteInsumo = async (req, res) => {
    const { id } = req.params;

    try {
        await Insumo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Insumo Eliminado correctmente '});
    } catch (error) {
        res.status(400).json({ messsage: error.message });
    }
};