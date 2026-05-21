import { getLoginExpectation } from '../../rules/login_rules';

describe('login_rules', () => {
  it('credenciales validas', () => {
    const r = getLoginExpectation('student', 'Password123');
    expect(r.shouldSucceed).to.be.true;
    expect(r.expectedUrlContains).to.eq('/logged-in-successfully/');
    expect(r.expectedMessage).to.match(/successfully logged in/i);
  });

  it('usuario invalido', () => {
    const r = getLoginExpectation('incorrectUser', 'Password123');
    expect(r.shouldSucceed).to.be.false;
    expect(r.expectedMessage).to.eq('Your username is invalid!');
  });

  it('password invalido', () => {
    const r = getLoginExpectation('student', 'incorrectPassword');
    expect(r.shouldSucceed).to.be.false;
    expect(r.expectedMessage).to.eq('Your password is invalid!');
  });

  it('credenciales vacias', () => {
    const r = getLoginExpectation('', '');
    expect(r.shouldSucceed).to.be.false;
    expect(r.expectedMessage).to.eq('Your username is invalid!');
  });
});
