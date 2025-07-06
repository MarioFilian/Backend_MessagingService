const { createProxyMiddleware } = require('http-proxy-middleware');
const validateAccessToken = require('./validateAccessToken');

const createServiceProxy = (app, { route, target, rewritePrefix, targetPrefix = rewritePrefix, name, protected: isProtected }) => {
  const middlewares = [];

  if (isProtected) {
    middlewares.push(validateAccessToken);
  }

  middlewares.push(createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^${rewritePrefix}`]: targetPrefix },
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
    },
  }));

  app.use(route, ...middlewares);
};

module.exports = createServiceProxy;
