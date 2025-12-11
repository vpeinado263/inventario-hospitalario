const express = require("express");
const router = express.Router();
const insumosController = require("../controllers/insumosController");

router.get("/", insumosController.getInsumos);

router.post("/", insumosController.createInsumo);

router.put("/:id", insumosController.updateInsumo);

router.delete("/:id", insumosController.deleteInsumo);

module.exports = router;
