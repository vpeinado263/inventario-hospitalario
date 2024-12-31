const express = requiere('express');
const router = express.Router();
const insumosController = requiere('../controller/insumosController');

router.get('/', insumosController.getInsumos);

router.post('/', insumosController.createInsumo);

router.put('/:id', insumosController.updateInsumo);

router.delete('/:id', insumosController.DeleteInsumo);

module.exports = router;
