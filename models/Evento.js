// models/Evento.js
const db = require('./db');

module.exports = {
  async getEventos() {
    const result = await db.query('SELECT * FROM eventos ORDER BY fecha ASC');
    return result.rows;
  },

  async crearEvento({ titulo, descripcion, fecha }) {
    const result = await db.query(
      'INSERT INTO eventos (titulo, descripcion, fecha) VALUES ($1, $2, $3) RETURNING *',
      [titulo, descripcion, fecha]
    );
    return result.rows[0];
  }
};
