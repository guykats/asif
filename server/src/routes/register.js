const express = require('express');
const db = require('../db');

const router = express.Router();

const PHONE_RE = /^\d{10,}$/;

function validate(body) {
  const errors = {};
  const familyName = String(body.familyName || '').trim();
  const husbandName = String(body.husbandName || '').trim();
  const husbandPhone = String(body.husbandPhone || '').replace(/[\s-]/g, '');
  const wifeName = String(body.wifeName || '').trim();
  const wifePhone = String(body.wifePhone || '').replace(/[\s-]/g, '');
  const childrenBirthYears = String(body.childrenBirthYears || '').trim();
  const childrenCount = Number(body.childrenCount);

  if (!familyName) errors.familyName = 'שדה חובה';
  if (!husbandName) errors.husbandName = 'שדה חובה';
  if (!PHONE_RE.test(husbandPhone)) errors.husbandPhone = 'מספר טלפון חייב להכיל 10 ספרות לפחות';
  if (!wifeName) errors.wifeName = 'שדה חובה';
  if (!PHONE_RE.test(wifePhone)) errors.wifePhone = 'מספר טלפון חייב להכיל 10 ספרות לפחות';
  if (!Number.isInteger(childrenCount) || childrenCount < 0) errors.childrenCount = 'מספר ילדים לא יכול להיות שלילי';
  if (!childrenBirthYears) errors.childrenBirthYears = 'שדה חובה';

  return {
    errors,
    value: { familyName, husbandName, husbandPhone, wifeName, wifePhone, childrenCount, childrenBirthYears },
  };
}

router.post('/', (req, res) => {
  const { errors, value } = validate(req.body || {});

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const stmt = db.prepare(`
    INSERT INTO registrations
      (family_name, husband_name, husband_phone, wife_name, wife_phone, children_count, children_birth_years)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    value.familyName,
    value.husbandName,
    value.husbandPhone,
    value.wifeName,
    value.wifePhone,
    value.childrenCount,
    value.childrenBirthYears
  );

  res.status(201).json({ id: result.lastInsertRowid });
});

module.exports = router;
