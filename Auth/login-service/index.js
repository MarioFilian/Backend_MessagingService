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


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Login service running on port ${PORT}`);
  console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
