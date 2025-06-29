require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const setupSwagger = require('./src/config/swagger');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

setupSwagger(app); // Primero swagger
app.use('/auth', authRoutes); // Luego tus rutas reales

app.get('/auth/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
const EC2_HOST_LOGIN = process.env.EC2_HOST_LOGIN;
app.listen(PORT, () => {
  console.log(`✅ Login service running on port ${PORT}`);
  console.log(`📄 Swagger docs available at http://${EC2_HOST_LOGIN}:${PORT}/api-docs`);
});
