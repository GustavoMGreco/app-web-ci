const request = require('supertest');
const app = require('../../src/app');

describe('API', () => {
  test('GET /health retorna 200 e status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /sum retorna o resultado da soma', async () => {
    const res = await request(app).get('/sum?a=2&b=3');
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test('GET /sum com parametro invalido retorna 400', async () => {
    const res = await request(app).get('/sum?a=x&b=3');
    expect(res.status).toBe(400);
  });
});
