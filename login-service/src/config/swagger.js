const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Login Service API',
      version: '1.0.0',
      description: 'API for user login and JWT token generation',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // ruta donde están tus rutas con anotaciones
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
