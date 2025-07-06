const { connectRedis, getRedis } = require('../config/redis');
const pool = require('../config/postgres');
const request = require('supertest');
const app = require('../../app');

beforeAll(() => {
  connectRedis();
});

afterAll(async () => {
  await getRedis().quit();
  await pool.end();
});

describe('GET /health', () => {
  it('should respond with 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
