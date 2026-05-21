import { LoginPage } from '../pages/LoginPage';
import { getLoginExpectation, LOGIN_SCENARIOS } from '../../rules/login_rules';

describe('Login UI (data-driven)', () => {
  const login = new LoginPage();

  LOGIN_SCENARIOS.forEach(({ name, username, password }) => {
    it(name, () => {
      const expectation = getLoginExpectation(username, password);

      login.open();
      login.login(username, password);

      if (expectation.shouldSucceed) {
        login.verifySuccess(expectation);
      } else {
        login.verifyError(expectation.expectedMessage);
      }
    });
  });
});
