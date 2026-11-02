// Usage: node scripts/createUser.js <email> <password>
const bcrypt = require('bcryptjs');
const pool = require('../src/config/db');
const User = require('../src/models/User');

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.log('Usage: node scripts/createUser.js <email> <password>');
  process.exit(1);
}

(async () => {
  try {
    await User.create(email, await bcrypt.hash(password, 10));
    console.log('User created:', email);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
})();
