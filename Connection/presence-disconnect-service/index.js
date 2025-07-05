const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Presence = require('./models/Presence');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3011;

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'presence-connect-service',
}).then(() => {
  console.log(`✅ Connected to MongoDB`);
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// 📌 Ruta para marcar usuario como desconectado
app.post('/presence/disconnect', async (req, res) => {
  const { userId, disconnectedAt } = req.body;

  const parsedUserId = parseInt(userId, 10);
  if (isNaN(parsedUserId)) {
    return res.status(400).json({ error: 'Invalid or missing userId' });
  }

  try {
    const updated = await Presence.findOneAndUpdate(
      { userId: parsedUserId },
      {
        $set: {
          status: 'offline',
          disconnectedAt: disconnectedAt ? new Date(disconnectedAt) : new Date()
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: `User with userId ${parsedUserId} not found` });
    }

    console.log('🔄 Updated presence:', updated);
    res.json({ message: '✅ User marked as offline', data: updated });
  } catch (err) {
    console.error('❌ Error marking user offline:', err);
    res.status(500).json({ error: 'Could not mark user offline' });
  }
});

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Presence Service running on http://localhost:${PORT}`);
});
