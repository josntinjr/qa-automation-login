/**
 * Wrapper de esperas (Opción B): condiciones explícitas, sin cy.wait(ms).
 */

/**
 * @param {() => Cypress.Chainable} getElement
 * @param {{ timeout?: number }} [options]
 */
export function waitForVisible(getElement, options = {}) {
  const timeout = options.timeout ?? Cypress.config("defaultCommandTimeout");
  return getElement().should("be.visible", { timeout });
}

/**
 * Click con precondiciones (visible + habilitado). Cypress reintenta automáticamente.
 * @param {() => Cypress.Chainable} getElement
 * @param {{ timeout?: number }} [options]
 */
export function safeClick(getElement, options = {}) {
  const timeout = options.timeout ?? Cypress.config("defaultCommandTimeout");
  return getElement()
    .should("be.visible", { timeout })
    .should("be.enabled")
    .click();
}
