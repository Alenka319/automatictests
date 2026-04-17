import validatePassword from '../src/passwordValidator.js';

describe('validatePassword', () => {
  describe('валидные пароли', () => {
    test.each([
      ['Password123'],
      ['MySecurePass999'],
      ['HelloWorld42'],
      ['A1b2C3d4'],
    ])('пароль "%s" должен быть валидным', (password) => {
      const result = validatePassword(password);
      expect(result).toEqual({ valid: true, message: 'Password is strong' });
    });
  });

  describe('невалидные пароли', () => {
    test.each([
      ['Pass1', 'Password must be at least 8 characters long'],
      ['Passwordabc', 'Password must contain at least one digit'],
      ['password123', 'Password must contain at least one uppercase letter'],
      ['PASSWORD123', 'Password must contain at least one lowercase letter'],
    ])('пароль "%s" должен выдавать ошибку: "%s"', (password, expectedMessage) => {
      const result = validatePassword(password);
      expect(result).toEqual({ valid: false, message: expectedMessage });
    });
  });

  describe('невалидные типы данных', () => {
    test.each([
      [12345678],
      [null],
      [undefined],
      [['pass']],
      [{}],
      [() => {}],
    ])('входные данные %p должны выбрасывать ошибку', (invalidInput) => {
      expect(() => validatePassword(invalidInput)).toThrow('Password must be a string');
    });
  });

  test('приоритет проверки длины (несколько ошибок)', () => {
    const result = validatePassword('Pa1');
    expect(result).toEqual({
      valid: false,
      message: 'Password must be at least 8 characters long'
    });
  });
});