const request = require('supertest');
const app = require('../../src/app');
const { closeDb } = require('../../src/db');

afterEach(() => closeDb());

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

describe('Items API', () => {
  test('GET /items retorna lista vazia inicialmente', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /items cria um item e retorna 201', async () => {
    const res = await request(app).post('/items').send({ name: 'item teste' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('item teste');
    expect(res.body.id).toBeDefined();
  });

  test('POST /items sem name retorna 400', async () => {
    const res = await request(app).post('/items').send({});
    expect(res.status).toBe(400);
  });

  test('POST /items com name vazio retorna 400', async () => {
    const res = await request(app).post('/items').send({ name: '   ' });
    expect(res.status).toBe(400);
  });

  test('GET /items retorna itens criados', async () => {
    await request(app).post('/items').send({ name: 'item 1' });
    await request(app).post('/items').send({ name: 'item 2' });
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe('item 1');
  });
});
