// Usage: npm run migrate
// migrations/ folder la irukkura *.sql files ah name order la run pannum.
// Already run aana files ah schema_migrations table la track pannum, so marubadi skip aagum.
const fs = require('fs');
const path = require('path');
const pool = require('../src/config/db');

const DIR = path.join(__dirname, '..', 'migrations');

(async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name       TEXT PRIMARY KEY,
        applied_at TIMESTAMP DEFAULT NOW()
      )`);

    const done = new Set((await client.query('SELECT name FROM schema_migrations')).rows.map((r) => r.name));
    const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.sql')).sort();

    let ran = 0;
    for (const file of files) {
      if (done.has(file)) continue;
      const sql = fs.readFileSync(path.join(DIR, file), 'utf8');
      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
        await client.query('COMMIT');
        console.log('Applied:', file);
        ran++;
      } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`${file} failed: ${err.message}`);
      }
    }
    console.log(ran ? `Done. ${ran} migration(s) applied.` : 'Nothing to migrate. Database is up to date.');
  } catch (err) {
    console.error('Migration error:', err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
})();
