// Usage: node scripts/updatePassword.js <email> <newPassword>
const bcrypt = require('bcryptjs');
const pool = require('../src/config/db');
const User = require('../src/models/User');

const [email, newPassword] = process.argv.slice(2);
if (!email || !newPassword) {
  console.log('Usage: node scripts/updatePassword.js <email> <newPassword>');
  process.exit(1);
}

(async () => {
  try {
    const count = await User.updatePassword(email, await bcrypt.hash(newPassword, 10));
    console.log(count ? `Password updated for: ${email}` : `No user found with email: ${email}`);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
})();
