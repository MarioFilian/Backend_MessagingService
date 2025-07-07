const express = require('express');
const dotenv = require('dotenv');
const connectMongo = require('./config/db');
const Presence = require('./models/Presence');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3011;

app.use(express.json());

// Connect to MongoDB
connectMongo();

// Route to mark user as disconnected (offline)
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
          disconnectedAt: disconnectedAt ? new Date(disconnectedAt) : new Date(),
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

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Presence Disconnect Service running on http://localhost:${PORT}`);
});
