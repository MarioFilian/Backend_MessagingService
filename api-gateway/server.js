const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Configuración de rutas proxy
const routes = [
  {
    route: '/auth/login',
    target: `http://${process.env.HOST_LOGIN}:${process.env.PORT_LOGIN}`,
    rewritePrefix: '/auth',
    name: 'auth/login'
  },
  {
    route: '/users/register',
    target: `http://${process.env.HOST_REGISTER}:${process.env.PORT_REGISTER}`,
    rewritePrefix: '/users',
    targetPrefix: '/api',
    name: 'users/register'
  }
];

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Función para crear middleware proxy
const createServiceProxy = ({ route, target, rewritePrefix, targetPrefix = rewritePrefix, name }) => {
  app.use(route, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${rewritePrefix}`]: targetPrefix
    },
    selfHandleResponse: false,
    onProxyReq: (proxyReq, req, res) => {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`✅ Respuesta del servicio ${name}: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error(`❌ Error en el proxy de ${name}:`, err.message);
      if (!res.headersSent) {
        res.status(503).json({ error: `Servicio de ${name} no disponible` });
      }
    }
  }));
};

// Registrar todos los proxies
routes.forEach(createServiceProxy);

// Ruta fallback
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 API Gateway corriendo en http://localhost:${PORT}`);
});
