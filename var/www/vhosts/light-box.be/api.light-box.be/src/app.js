const express = require('express');
const cors = require('cors');
const config = require('./config');
const logger = require('./utils/logger');

const app = express();

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: config.corsOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    error: 'Une erreur est survenue sur le serveur'
  });
});

module.exports = app;