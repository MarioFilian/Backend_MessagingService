const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { PORT } = require('./config/env');
const logger = require('./middlewares/logger');
const createServiceProxy = require('./middlewares/proxyFactory');
const routes = require('./routes/proxyRoutes');

const app = express();

// Seguridad y límites
app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones, intenta más tarde.'
}));
app.use(express.json());

// Logging simple
app.use(logger);

// Registrar proxies
routes.forEach(routeConfig => createServiceProxy(app, routeConfig));

// Ruta fallback
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 API Gateway corriendo en http://localhost:${PORT}`);
});
