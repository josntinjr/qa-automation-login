import LoginPage from "../support/pageObjects/LoginPage.js";
import LoginExpectation from "../support/login_rules/LoginExpectation.js";
import loginCases from "../fixtures/loginCases.json";

describe("Practice Test Automation - Login", () => {
  const loginPage = new LoginPage();

  loginCases.forEach(({ title, username, password }) => {
    it(title, () => {
      const expectation = LoginExpectation.evaluate({ username, password });

      loginPage.visit();
      loginPage.login(username, password);
      loginPage.assertOutcome(expectation);
    });
  });
});

describe("Login - edge cases (programmable rules)", () => {
  it("rejects null credentials at rule layer (unit-style guard)", () => {
    expect(() => LoginExpectation.evaluate(null)).to.throw();
  });

  it("empty username shows invalid-user message on submit", () => {
    const expectation = LoginExpectation.evaluate({
      username: "",
      password: "Password123",
    });
    const loginPage = new LoginPage();

    loginPage.visit();
    cy.get("#username").clear();
    loginPage.fillPassword("Password123");
    loginPage.submit();
    loginPage.assertOutcome(expectation);
  });
});
