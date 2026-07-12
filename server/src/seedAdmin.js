// Manual admin password reset tool. Run explicitly (`npm run seed-admin`) when the
// admin has forgotten their password. This always overwrites - unlike the automatic
// first-boot seed in ensureAdmin.js, which only fires when no admin exists yet, so
// that a normal deploy never silently reverts a password changed via the dashboard.
require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

const username = process.env.ADMIN_USERNAME || 'admin';
const password = process.env.ADMIN_PASSWORD || 'nofei-nechemia-2026';

const existing = db.prepare('SELECT id FROM admins WHERE username = ?').get(username);
const hash = bcrypt.hashSync(password, 10);

if (existing) {
  db.prepare('UPDATE admins SET password_hash = ? WHERE username = ?').run(hash, username);
  console.log(`Reset password for admin user "${username}" to the value of ADMIN_PASSWORD.`);
} else {
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(username, hash);
  console.log(`Created admin user "${username}".`);
}
