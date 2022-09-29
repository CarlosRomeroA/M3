const express = require('express');
const app = express();
const { sumArray, pluck } = require('./sumArray.js');

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/sum', (req, res) => {
  const { a, b } = req.body;
    res.send({
    result: a + b,
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body;
  const result = sumArray(array, num);
  res.send({result: result}) 
});

app.post('/numString', (req, res) => {
  const { string } = req.body;
  if (typeof string !== 'string' || string === '') return res.sendStatus(400)
  return res.send({result: string.length})
})

app.post('/pluck', (req, res) => {
  const { array, prop } = req.body;
  if (!Array.isArray(array) || prop === '') return res.sendStatus(400)
  return res.send({result: pluck(array, prop)})
})
module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
