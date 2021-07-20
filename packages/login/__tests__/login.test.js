const Login = require('..');

const loginInit = new Login();

beforeEach(() => {
  window.tronWeb = {
    defaultAddress: {
      base58: 'TGKN4uazM6snmU9EHcCx5DsvcLWjsmZV9t'
    }
  };
  loginInit.defaultAccount = 'defaultAccount';
});

describe('login', () => {
  test('login test', () => {
    let res = loginInit.test();
    expect(res).toBe('hello world');
  });
});

describe('test checkLogins', () => {
  test('user not login', () => {
    window = {};
    let res = loginInit.checkLogin();
    expect(res).toBeFalsy();
  });

  test('user login', () => {
    let res = loginInit.checkLogin();
    expect(res).toBeTruthy();
  });
});
