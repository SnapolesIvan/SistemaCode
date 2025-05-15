const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol } = req.body;
  try {
    await db.query(
      'UPDATE usuarios SET nombre=$1, email=$2, rol=$3 WHERE id=$4',
      [nombre, email, rol, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuarios WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
