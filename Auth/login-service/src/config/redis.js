const Redis = require('ioredis');

let redis;

function connectRedis() {
  if (!redis) {
    redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
    });

    redis.on('connect', () => console.log('🔌 Conectado a Redis'));
    redis.on('error', (err) => console.error('❌ Redis error:', err));
  }
  return redis;
}

function getRedis() {
  if (!redis) {
    throw new Error('Redis no está conectado. Llama primero a connectRedis()');
  }
  return redis;
}

module.exports = { connectRedis, getRedis };
