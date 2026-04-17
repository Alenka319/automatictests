import calculateDiscount from '../src/discount.js';

describe.each([
  [1000, 10, 900, 'целое число'],
  [500, 0, 500, 'нулевая скидка'],
  [200, 100, 0, 'полная скидка'],
  [99.99, 50, 49.995, 'дробное значение']
])('calculateDiscount с ценой %p и скидкой %p', (price, percent, expected, scenario) => {
  test(`корректно работает для ${scenario}`, () => {
    if (typeof expected === 'number' && expected !== Math.floor(expected)) {
      expect(calculateDiscount(price, percent)).toBeCloseTo(expected, 3);
    } else {
      expect(calculateDiscount(price, percent)).toBe(expected);
    }
  });
});

describe('calculateDiscount с невалидными процентами', () => {
  test('отрицательный процент выбрасывает ошибку', () => {
    expect(() => calculateDiscount(100, -10)).toThrow('Invalid percent');
  });

  test('процент больше 100 выбрасывает ошибку', () => {
    expect(() => calculateDiscount(100, 110)).toThrow('Invalid percent');
  });
});