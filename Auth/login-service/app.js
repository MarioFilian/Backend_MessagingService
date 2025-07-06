const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const setupSwagger = require('./src/config/swagger');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

setupSwagger(app);
app.use('/auth', authRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
