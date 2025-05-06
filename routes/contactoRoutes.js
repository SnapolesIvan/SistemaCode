const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

// Ruta para enviar mensaje de contacto
router.post('/', contactoController.enviarContacto);

module.exports = router;
