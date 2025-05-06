const pool = require('../db');

exports.enviarContacto = async (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  try {
    await pool.query(
      'INSERT INTO mensajes_contacto (nombre, correo, mensaje) VALUES ($1, $2, $3)',
      [nombre, correo, mensaje]
    );
    res.status(201).json({ mensaje: 'Mensaje enviado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
};
