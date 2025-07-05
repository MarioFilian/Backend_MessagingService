const redis = require('../config/redis');
const createMessage = require('../models/message');

async function sendMessage(req, res) {
  const { senderId, recipientId, content } = req.body;

  if (!senderId || !recipientId || !content) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const message = createMessage({ senderId, recipientId, content });

  try {
    await redis.publish(process.env.REDIS_CHANNEL, JSON.stringify(message));
    return res.status(200).json({ status: 'sent', message });
  } catch (err) {
    console.error('❌ Redis publish error:', err);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
}

module.exports = { sendMessage };
