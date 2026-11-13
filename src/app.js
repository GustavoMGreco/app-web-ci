const express = require('express');
const { sum } = require('./math');

const app = express();

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

module.exports = app;
