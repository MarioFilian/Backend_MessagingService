const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const sendRoutes = require('./routes/send');
const healthRoutes = require('./routes/health');

app.use(cors());
app.use(express.json());

app.use('/message/send', sendRoutes);
app.use('/health', healthRoutes);

const PORT = process.env.PORT || 3009;
const server = app.listen(PORT, () => {
  console.log(`🚀 message-send-service running on port ${PORT}`);
});

module.exports = { app, server }; // exportamos ambos
