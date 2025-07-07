const express = require('express');
const dotenv = require('dotenv');
const connectMongo = require('./db/mongo');
const Presence = require('./models/Presence');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());

// Conexión MongoDB
connectMongo();

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

// Endpoint /health
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok', service: 'presence-connect-service' });
});

app.listen(PORT, () => {
  console.log(`🚀 Presence Connect Service running on http://localhost:${PORT}`);
});
