const pool = require('../config/db');

const COLS = `id, name, mobile,
  to_char(dob, 'YYYY-MM-DD') AS dob,
  to_char(wedding_date, 'YYYY-MM-DD') AS "weddingDate"`;

exports.findAll = async () => {
  const r = await pool.query(`SELECT ${COLS} FROM customers ORDER BY created_at DESC`);
  return r.rows;
};

exports.create = async ({ name, mobile, dob, weddingDate }) => {
  const r = await pool.query(
    `INSERT INTO customers (name, mobile, dob, wedding_date)
     VALUES ($1, $2, $3, $4) RETURNING ${COLS}`,
    [name.trim(), mobile, dob, weddingDate || null]
  );
  return r.rows[0];
};

exports.update = async (id, { name, mobile, dob, weddingDate }) => {
  const r = await pool.query(
    `UPDATE customers
     SET name = $1, mobile = $2, dob = $3, wedding_date = $4, updated_at = NOW()
     WHERE id = $5 RETURNING ${COLS}`,
    [name.trim(), mobile, dob, weddingDate || null, id]
  );
  return r.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM customers WHERE id = $1', [id]);
};
