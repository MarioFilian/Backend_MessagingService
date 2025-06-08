require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const setupSwagger = require('./src/config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/login', authRoutes);

// Swagger UI disponible en /api-docs
setupSwagger(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Login service running on port ${PORT}`);
  console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
