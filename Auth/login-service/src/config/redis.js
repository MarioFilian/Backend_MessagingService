const Redis = require('ioredis');

let redis;

function connectRedis() {
  if (!redis) {
    redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
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
