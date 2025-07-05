const request = require('supertest');
const { app, server } = require('../index');
const redis = require('../config/redis');

afterAll(async () => {
  await redis.quit();
  await new Promise((resolve) => server.close(resolve)); // Cierra el servidor
});

describe('GET /health', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

// ... demás tests
