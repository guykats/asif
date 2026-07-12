require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const registerRouter = require('./routes/register');
const adminRouter = require('./routes/admin');
const assetsRouter = require('./routes/assets');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/register', registerRouter);
app.use('/api/admin', adminRouter);
app.use('/api/assets', assetsRouter);

app.get('/api/health', (req, res) => res.json({ ok: true }));

const clientDist = path.join(__dirname, '..', '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Asif server listening on port ${PORT}`);
});
