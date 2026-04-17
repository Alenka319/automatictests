function validatePassword(password) {
    // Проверка типа аргумента
    if (typeof password !== 'string') {
      throw new Error('Password must be a string');
    }
  
    // Проверка длины
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
  
    // Проверка наличия цифры
    if (!/\d/.test(password)) {
      return { valid: false, message: 'Password must contain at least one digit' };
    }
  
    // Проверка наличия заглавной буквы
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
  
    // Проверка наличия строчной буквы
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
  
    // Все проверки пройдены
    return { valid: true, message: 'Password is strong' };
  }

export default validatePassword
