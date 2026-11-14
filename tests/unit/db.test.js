const { getDb, closeDb } = require('../../src/db');

describe('db', () => {
  afterEach(() => closeDb());

  test('cria tabela items ao inicializar', () => {
    const db = getDb();
    const result = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='items'",
      )
      .get();
    expect(result).toBeDefined();
    expect(result.name).toBe('items');
  });

  test('insere e recupera um item', () => {
    const db = getDb();
    db.prepare('INSERT INTO items (name) VALUES (?)').run('item-teste');
    const item = db
      .prepare('SELECT * FROM items WHERE name = ?')
      .get('item-teste');
    expect(item).toBeDefined();
    expect(item.name).toBe('item-teste');
    expect(item.id).toBeDefined();
  });

  test('ids sao autoincrementados', () => {
    const db = getDb();
    const r1 = db.prepare('INSERT INTO items (name) VALUES (?)').run('a');
    const r2 = db.prepare('INSERT INTO items (name) VALUES (?)').run('b');
    expect(r2.lastInsertRowid).toBeGreaterThan(r1.lastInsertRowid);
  });
});
