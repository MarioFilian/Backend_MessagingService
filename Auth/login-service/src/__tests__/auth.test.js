const request = require('supertest');
const app = require('../../app');
const redis = require('../../src/config/redis');
const pool = require('../../src/config/postgres');

describe('GET /auth/health', () => {
  it('should respond with 200 OK', async () => {
    const res = await request(app).get('/auth/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  afterAll(async () => {
    await redis.quit();     // 👈 Cierra conexión Redis
    await pool.end();       // 👈 Cierra pool PostgreSQL
  });
});
