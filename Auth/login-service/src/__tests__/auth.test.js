const request = require('supertest');
const app = require('../../index'); 

describe('GET /auth/health', () => {
  it('debe responder 200 OK', async () => {
    const res = await request(app).get('/auth/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
