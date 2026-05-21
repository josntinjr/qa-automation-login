import type { LoginExpectation } from '../../rules/login_rules';

export class LoginPage {
  open() {
    cy.visit('/');
    cy.get('#username').should('be.visible');
  }

  login(user: string, pass: string) {
    cy.get('#username').clear().type(user);
    cy.get('#password').clear().type(pass);
    cy.get('#submit').click();
  }

  verifySuccess(expectation?: Pick<LoginExpectation, 'expectedUrlContains'>) {
    const path = expectation?.expectedUrlContains ?? 'logged-in-successfully';
    cy.url().should('include', path.replace(/\//g, ''));
    cy.contains(/Congratulations|successfully logged in/i).should('be.visible');
    cy.contains('a', 'Log out').should('be.visible');
  }

  verifyError(message: string) {
    cy.get('#error').should('be.visible').and('have.text', message);
  }
}
