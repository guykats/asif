const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { requireAuth, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(String(username || ''));

  if (!admin || !bcrypt.compareSync(String(password || ''), admin.password_hash)) {
    return res.status(401).json({ error: 'שם משתמש או סיסמה שגויים' });
  }

  const token = jwt.sign({ sub: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, username: admin.username });
});

router.get('/registrations', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all();
  res.json({ registrations: rows });
});

router.get('/registrations.csv', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all();
  const headers = ['תאריך', 'שם משפחה', 'שם האיש', 'טלפון האיש', 'שם האישה', 'טלפון האישה', 'מספר ילדים', 'שנות לידה'];
  const escapeCsv = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = [headers.map(escapeCsv).join(',')];

  for (const r of rows) {
    lines.push([
      r.created_at, r.family_name, r.husband_name, r.husband_phone,
      r.wife_name, r.wife_phone, r.children_count, r.children_birth_years,
    ].map(escapeCsv).join(','));
  }

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="registrations.csv"');
  res.send('﻿' + lines.join('\n'));
});

router.delete('/registrations/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM registrations WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

router.post('/change-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.admin.sub);

  if (!admin || !bcrypt.compareSync(String(currentPassword || ''), admin.password_hash)) {
    return res.status(401).json({ error: 'הסיסמה הנוכחית שגויה' });
  }
  if (!newPassword || String(newPassword).length < 6) {
    return res.status(400).json({ error: 'הסיסמה החדשה חייבת להכיל לפחות 6 תווים' });
  }

  const hash = bcrypt.hashSync(String(newPassword), 10);
  db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?').run(hash, admin.id);
  res.json({ ok: true });
});

module.exports = router;
