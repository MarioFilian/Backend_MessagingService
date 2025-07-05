const Redis = require('ioredis');

let redis;

function connectRedis() {
  if (!redis) {
    const host = process.env.REDIS_HOST || 'localhost';
    const port = parseInt(process.env.REDIS_PORT, 10) || 6379;
    const password = process.env.REDIS_PASSWORD || undefined;

    redis = new Redis({
      host,
      port,
      password,
    });

    redis.on('connect', () => console.log('🔌 Conectado a Redis'));
    redis.on('error', (err) => console.error('❌ Redis error:', err));
  }
  return redis;
}

function getRedis() {
  if (!redis) {
    throw new Error('Redis not connected. Call connectRedis() first.');
  }
  return redis;
}

module.exports = { connectRedis, getRedis };
