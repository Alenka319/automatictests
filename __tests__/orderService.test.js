import { jest, beforeEach, test, expect } from '@jest/globals';

jest.unstable_mockModule('../src/emailService.js', () => ({
  default: jest.fn(),
}));

const { default: processOrder } = await import('../src/orderService.js');
const { default: sendEmail } = await import('../src/emailService.js');

beforeEach(() => {
  sendEmail.mockClear();
});

describe('processOrder', () => {
  const validOrder = { id: 1, total: 100 };
  const validEmail = 'user@example.com';

  describe('с валидными данными', () => {
    test('отправляет email один раз', () => {
      processOrder(validOrder, validEmail);
      expect(sendEmail).toHaveBeenCalledTimes(1);
    });

    test('отправляет email с правильными аргументами', () => {
      processOrder(validOrder, validEmail);
      expect(sendEmail).toHaveBeenCalledWith(
        validEmail,
        'Order Confirmation',
        'Order 1 confirmed. Total: $100'
      );
    });

    test('возвращает объект с success: true', () => {
      const result = processOrder(validOrder, validEmail);
      expect(result.success).toBeTruthy();
      expect(result.message).toBeDefined();
    });
  });

  describe('с невалидными данными', () => {
    test('total <= 0 выбрасывает ошибку', () => {
      const invalidOrder = { id: 1, total: 0 };
      expect(() => processOrder(invalidOrder, validEmail)).toThrow('Invalid order total');
    });

    test('total <= 0 не вызывает sendEmail', () => {
      const invalidOrder = { id: 1, total: -5 };
      expect(() => processOrder(invalidOrder, validEmail)).toThrow();
      expect(sendEmail).not.toHaveBeenCalled();
    });
  });
});