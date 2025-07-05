const { connectRedis, getRedis } = require('../../src/config/redis');
const pool = require('../../src/config/postgres');
const request = require('supertest');
const app = require('../../app');

beforeAll(() => {
  connectRedis(); // conectar Redis antes de los tests
});

afterAll(async () => {
  await getRedis().quit(); // cerrar la conexión Redis correctamente
  await pool.end();        // cerrar conexión PostgreSQL
});

describe('GET /auth/health', () => {
  it('should respond with 200 OK', async () => {
    const res = await request(app).get('/auth/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
