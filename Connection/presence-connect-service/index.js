// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Presence = require('./models/Presence');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'presence-connect-service',
}).then(() => {
  console.log(`✅ Connected to MongoDB`);
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// 📌 Ruta para marcar usuario como conectado
app.post('/presence/connect', async (req, res) => {
  const { userId, username, connectedAt } = req.body;

  if (!userId || !username) {
    return res.status(400).json({ error: 'Missing userId or username' });
  }

  try {
    await Presence.updateOne(
      { userId },
      {
        $set: {
          username,
          status: 'online',
          connectedAt: connectedAt ? new Date(connectedAt) : new Date(),
        },
      },
      { upsert: true }
    );

    res.json({ message: 'User marked as online (upsert)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not mark user online' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Presence Connect Service running on http://localhost:${PORT}`);
});
