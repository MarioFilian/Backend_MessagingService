const { HOST_LOGIN, PORT_LOGIN, HOST_REGISTER, PORT_REGISTER } = require('../config/env');

const routes = [
  {
    route: '/auth/login',
    target: `http://${HOST_LOGIN}:${PORT_LOGIN}`,
    rewritePrefix: '/auth',
    name: 'auth/login',
    protected: false,
  },
  {
    route: '/users/register',
    target: `http://${HOST_REGISTER}:${PORT_REGISTER}`,
    rewritePrefix: '/users',
    targetPrefix: '/api',
    name: 'users/register',
    protected: false, // Cambiar a true si se requiere validación
  },
];

module.exports = routes;
