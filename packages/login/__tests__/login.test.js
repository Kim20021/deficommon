const Login = require('..');

const loginInit = new Login();

describe('login', () => {
  test('login test', () => {
    let res = loginInit.test();
    expect(res).toBe('hello world');
  });

  test('test checkLogins', () => {
    // Object.defineProperty(window, 'defaultAccount', false);
    let res = loginInit.checkLogin();
    expect(res).toBeFalsy();
  });
});
