require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const EC2_HOST_LOGIN = process.env.EC2_HOST_LOGIN || 'localhost';
const PORT = process.env.PORT || 3001;

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
        url: `http://${EC2_HOST_LOGIN}:${PORT}/auth/`,
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Aquí lee tus anotaciones Swagger
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
