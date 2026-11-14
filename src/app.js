const express = require('express');
const { sum } = require('./math');
const { getDb } = require('./db');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'a e b devem ser numeros' });
  }

  return res.json({ result: sum(a, b) });
});

app.get('/items', (req, res) => {
  const db = getDb();
  const items = db.prepare('SELECT * FROM items').all();
  res.json(items);
});

app.post('/items', (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name e obrigatorio' });
  }

  const db = getDb();
  const stmt = db.prepare('INSERT INTO items (name) VALUES (?)');
  const result = stmt.run(name.trim());
  return res
    .status(201)
    .json({ id: result.lastInsertRowid, name: name.trim() });
});

module.exports = app;
