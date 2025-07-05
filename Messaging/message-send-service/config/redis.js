const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

// Solo loguea cuando no estás en modo test:
if (process.env.NODE_ENV !== 'test') {
  redis.on('connect', () => console.log('🔌 Connected to Redis'));
  redis.on('error', (err) => console.error('❌ Redis error:', err));
}

module.exports = redis;
