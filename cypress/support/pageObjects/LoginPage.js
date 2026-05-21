import LoginExpectation from "../login_rules/LoginExpectation.js";
import { safeClick, waitForVisible } from "../helpers/waitHelpers.js";

/**
 * Page Object: acciones, elementos y verificaciones del login.
 */
class LoginPage {
  get usernameInput() {
    return cy.get("#username");
  }

  get passwordInput() {
    return cy.get("#password");
  }

  get submitButton() {
    return cy.get("#submit");
  }

  get errorMessage() {
    return cy.get("#error");
  }

  get successMessage() {
    return cy.get("h1.post-title, .post-title").first();
  }

  get logoutLink() {
    return cy.contains("a", "Log out");
  }

  visit() {
    const loginPath = Cypress.env("LOGIN_PATH") || "/practice-test-login/";
    cy.visit(loginPath);
    waitForVisible(() => this.usernameInput);
  }

  fillUsername(username) {
    waitForVisible(() => this.usernameInput);
    this.usernameInput.clear().type(username, { log: false });
  }

  fillPassword(password) {
    waitForVisible(() => this.passwordInput);
    this.passwordInput.clear().type(password, { log: false });
  }

  submit() {
    safeClick(() => this.submitButton);
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  /**
   * @param {import('../login_rules/LoginExpectation.js').LoginExpectationResult} expectation
   */
  assertOutcome(expectation) {
    if (expectation.shouldSucceed) {
      this.verifySuccessUrl(expectation.expectedUrlContains);
      this.verifySuccessMessage(expectation.expectedMessage);
      this.verifyLogoutVisible();
      return;
    }

    this.verifyErrorMessage(expectation.expectedMessage);
    cy.url().should("not.include", "/logged-in-successfully/");
  }

  verifySuccessUrl(expectedFragment) {
    cy.url({ timeout: 10000 }).should("include", expectedFragment);
  }

  /**
   * @param {string} expectedKeyword - Palabra clave del enunciado (p. ej. Congratulations)
   */
  verifySuccessMessage(expectedKeyword) {
    const aliases = LoginExpectation.successTextAliases();

    waitForVisible(() => this.successMessage);
    this.successMessage.invoke("text").then((text) => {
      const normalized = text.toLowerCase();
      const matchesAlias = aliases.some((alias) => normalized.includes(alias));
      const matchesKeyword = normalized.includes(
        String(expectedKeyword).toLowerCase(),
      );

      expect(
        matchesAlias || matchesKeyword,
        `success message should match ${JSON.stringify(aliases)} or "${expectedKeyword}"`,
      ).to.be.true;
    });
  }

  verifyLogoutVisible() {
    waitForVisible(() => this.logoutLink);
    this.logoutLink.should("be.visible");
  }

  verifyErrorMessage(expectedText) {
    waitForVisible(() => this.errorMessage);
    this.errorMessage.should("be.visible").and("contain", expectedText);
  }
}

export default LoginPage;
