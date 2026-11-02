const pool = require('../config/db');
const { VALUE_TYPES } = require('../validators/offerValidator');

const COLS = `id, name, type, value::float8 AS value,
  COALESCE(detail, '') AS detail,
  COALESCE(to_char(date_from, 'YYYY-MM-DD'), '') AS "from",
  COALESCE(to_char(date_to, 'YYYY-MM-DD'), '') AS "to",
  days,
  COALESCE(to_char(time_from, 'HH24:MI'), '') AS "tFrom",
  COALESCE(to_char(time_to, 'HH24:MI'), '') AS "tTo",
  status`;

// DB row -> React ku pogura shape
const toOutput = (r) => (r ? { ...r, value: r.value ?? '' } : r);

// React body -> DB params
const toParams = (b) => {
  const hasValue = VALUE_TYPES.includes(b.type);
  return [
    b.name.trim(),
    b.type,
    hasValue ? Number(b.value) : null,
    hasValue ? '' : (b.detail || '').trim(),
    b.from || null,
    b.to || null,
    b.days || [],
    b.tFrom || null,
    b.tTo || null,
    b.status || 'active',
  ];
};

exports.findAll = async () => {
  const r = await pool.query(`SELECT ${COLS} FROM offers ORDER BY created_at DESC`);
  return r.rows.map(toOutput);
};

exports.create = async (body) => {
  const r = await pool.query(
    `INSERT INTO offers (name, type, value, detail, date_from, date_to, days, time_from, time_to, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING ${COLS}`,
    toParams(body)
  );
  return toOutput(r.rows[0]);
};

exports.update = async (id, body) => {
  const r = await pool.query(
    `UPDATE offers SET name=$1, type=$2, value=$3, detail=$4, date_from=$5, date_to=$6,
       days=$7, time_from=$8, time_to=$9, status=$10, updated_at=NOW()
     WHERE id=$11 RETURNING ${COLS}`,
    [...toParams(body), id]
  );
  return toOutput(r.rows[0]);
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM offers WHERE id = $1', [id]);
};
