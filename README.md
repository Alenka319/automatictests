## Правила и регламент

- [Правила, рекомендации и порядок проведения](https://github.com/hexlet-college-students/exam-rules)

## Задание

Ваша задача написать тесты в директории `__tests__` для 4 функций.

### Примечания

Не изменяйте сами функции в директории `src`, все задания выполняются в директории `__tests__`.

## 1 задача

Функция `calculateDiscount(price, percent)` возвращает цену после скидки. Если `percent` отрицательный или больше 100, функция должна выбрасывать ошибку `'Invalid percent'`.

```javascript
// discount.js
function calculateDiscount(price, percent) {
  if (percent < 0 || percent > 100) {
    throw new Error('Invalid percent');
  }
  return price * (1 - percent / 100);
}
```

Напишите тесты в файле `discount.test.js` и проверьте,что:
- скидка 10% от 1000 равна 900;
- скидка 0% возвращает исходную цену;
- скидка 100% возвращает 0;
- вызов с процентом -10 выбрасывает ошибку с сообщением 'Invalid percent';
- вызов с процентом 110 выбрасывает ошибку с сообщением 'Invalid percent';
- вызов с дробным значением цены работает корректно.

## 2 задача

Функция `validatePassword(password)` проверяет сложность пароля и возвращает объект с результатом. Требования к паролю:
- длина не менее 8 символов;
- cодержит хотя бы одну цифру;
- cодержит хотя бы одну заглавную букву;
- cодержит хотя бы одну строчную букву;

Если пароль соответствует всем требованиям, функция возвращает:

```javascript
{ valid: true, message: 'Password is strong' }
```

Если не соответствует, возвращает:

```javascript
{ valid: false, message: 'Конкретное сообщение об ошибке' }
```

Возможные сообщения об ошибках:
- `Password must be at least 8 characters long`;
- `Password must contain at least one digit`;
- `Password must contain at least one uppercase letter`;
- `Password must contain at least one lowercase letter`.

Если передан аргумент не строкового типа, функция выбрасывает ошибку `Password must be a string`.

```javascript
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
```

Напишите тесты в файле `passwordValidator.test.js`, которые проверяют:
- валидный пароль (например, 'Password123');
- пароль короче 8 символов;
- пароль без цифр;
- пароль без заглавных букв;
- пароль без строчных букв;
- несколько ошибок одновременно — проверьте, что возвращается первая обнаруженная ошибка (например, короткий пароль без цифр должен вернуть ошибку длины);
- передачу не строки (число, null, undefined, массив) — проверьте, что выбрасывается ошибка  `Password must be a string`.

## 3 задача

Функция `fetchUserData(userId)` имитирует запрос к API. Она возвращает промис, который резолвится с объектом пользователя, если `userId > 0`, иначе реджектится с ошибкой `'Invalid user ID'`.

```javascript
// api.js
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: 'John Doe' });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 100);
  });
}
```
Напишите тесты в файле `api.test.js` и проверьте, что:
- для userId = 1 возвращается объект с полем `name: 'John Doe'`;
- для userId = 0 промис реджектится с ошибкой `'Invalid user ID'`;
- разные userId возвращают объекты с разными id.


## 4 задача

У вас есть сервис `orderService`, который зависит от внешней функции `sendEmail`. Вам нужно замокировать `sendEmail`, чтобы не отправлять реальные письма, и проверить, что она вызывается правильно.

```javascript
// emailService.js
function sendEmail(to, subject, body) {
  // реальная отправка письма
  console.log(`Sending email to ${to}`);
}
```

```javascript
// orderService.js
import sendEmail from './emailService.js'

function processOrder(order, userEmail) {
  if (order.total <= 0) {
    throw new Error('Invalid order total');
  }
  const message = `Order ${order.id} confirmed. Total: $${order.total}`;
  sendEmail(userEmail, 'Order Confirmation', message);
  return { success: true, message };
}
```

Напишите тесты в файле `orderService.test.js`:
- Замокайте модуль `emailService` с помощью `jest.mock()`.
- Проверьте, что:
    - при корректном заказе функция `sendEmail` вызывается ровно 1 раз с правильными аргументами (проверьте email, тему и тело письма);
    - `processOrder` возвращает объект `{ success: true, ... }`;
    - при `order.total <= 0` выбрасывается ошибка `'Invalid order total'`, и `sendEmail` не вызывается.
