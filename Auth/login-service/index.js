require('dotenv').config();
const { connectRedis } = require('./src/config/redis');
const app = require('./app');

const PORT = process.env.PORT || 3001;
const EC2_HOST_LOGIN = process.env.EC2_HOST_LOGIN || 'localhost';

connectRedis();

app.listen(PORT, () => {
  console.log(`✅ Login service running on port ${PORT}`);
  console.log(`📄 Swagger docs available at http://${EC2_HOST_LOGIN}:${PORT}/api-docs`);
});
