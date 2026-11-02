const pool = require('../config/db');

exports.findByEmail = async (email) => {
  const r = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return r.rows[0];
};

exports.create = async (email, passwordHash) => {
  await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2)', [email, passwordHash]);
};

exports.updatePassword = async (email, passwordHash) => {
  const r = await pool.query('UPDATE users SET password_hash = $1 WHERE email = $2', [passwordHash, email]);
  return r.rowCount; // 0 na user illa
};
