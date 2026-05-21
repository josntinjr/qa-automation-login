import LoginPage from "./pageObjects/LoginPage.js";
import LoginExpectation from "./login_rules/LoginExpectation.js";

Cypress.Commands.add("login", (username, password) => {
  new LoginPage().login(username, password);
});

/**
 * Login + aserciones según LoginExpectation (sin duplicar lógica del POM).
 */
Cypress.Commands.add(
  "loginWithExpectation",
  (username, password, { visit = false } = {}) => {
    const loginPage = new LoginPage();
    const expectation = LoginExpectation.evaluate({ username, password });

    if (visit) {
      loginPage.visit();
    }

    loginPage.login(username, password);
    loginPage.assertOutcome(expectation);

    return cy.wrap(expectation);
  },
);
