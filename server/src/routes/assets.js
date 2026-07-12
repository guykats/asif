const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const ALLOWED_KEYS = new Set(['logo', 'hero']);
const ALLOWED_MIME = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${req.params.key}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error('סוג קובץ לא נתמך'));
    }
    cb(null, true);
  },
});

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const assets = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  res.json({ assets });
});

router.post('/:key', requireAuth, (req, res) => {
  const { key } = req.params;
  if (!ALLOWED_KEYS.has(key)) {
    return res.status(400).json({ error: 'נכס לא מוכר' });
  }

  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'לא התקבל קובץ' });
    }

    const previous = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
    const url = `/uploads/${req.file.filename}`;

    db.prepare(`
      INSERT INTO settings (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).run(key, url);

    if (previous?.value) {
      const oldPath = path.join(uploadsDir, path.basename(previous.value));
      fs.unlink(oldPath, () => {});
    }

    res.json({ key, url });
  });
});

module.exports = router;
