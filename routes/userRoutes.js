const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para obtener perfil por ID
router.get('/:id', userController.obtenerPerfil);

module.exports = router;
