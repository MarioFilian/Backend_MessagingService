const { connectRedis } = require('./src/config/redis'); // Importa la función para conectar Redis
const app = require('./app');

const PORT = process.env.PORT || 3001;
const EC2_HOST_LOGIN = process.env.EC2_HOST_LOGIN || 'localhost';

// Conectar Redis antes de arrancar el servidor
connectRedis();

app.listen(PORT, () => {
  console.log(`✅ Login service running on port ${PORT}`);
  console.log(`📄 Swagger docs available at http://${EC2_HOST_LOGIN}:${PORT}/api-docs`);
});
