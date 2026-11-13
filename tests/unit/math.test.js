const { sum } = require('../../src/math');

describe('sum', () => {
  test('soma 2 + 3 = 5', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('soma numeros negativos', () => {
    expect(sum(-1, -4)).toBe(-5);
  });
});
