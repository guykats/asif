const bcrypt = require('bcryptjs');
const db = require('./db');

function ensureDefaultAdmin() {
  const count = db.prepare('SELECT COUNT(*) AS n FROM admins').get().n;
  if (count > 0) return;

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'nofei-nechemia-2026';
  const hash = bcrypt.hashSync(password, 10);

  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(username, hash);
  console.log(`No admin user existed yet - created "${username}" from ADMIN_USERNAME/ADMIN_PASSWORD.`);
}

module.exports = { ensureDefaultAdmin };
