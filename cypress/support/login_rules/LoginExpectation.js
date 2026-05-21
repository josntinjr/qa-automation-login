/**
 * @typedef {Object} LoginCredentials
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {Object} LoginExpectationResult
 * @property {boolean} shouldSucceed
 * @property {string|null} expectedUrlContains
 * @property {string} expectedMessage
 * @property {string} [reason] - Código interno para logs y tests unitarios
 */

export class LoginExpectationError extends Error {
  constructor(message) {
    super(message);
    this.name = "LoginExpectationError";
  }
}

const VALID_USER = "student";
const VALID_PASSWORD = "Password123";
const SUCCESS_URL = "/logged-in-successfully/";
const MSG_SUCCESS = "Congratulations";
const MSG_USER_INVALID = "Your username is invalid!";
const MSG_PASS_INVALID = "Your password is invalid!";

const SUCCESS_TEXT_ALIASES = [
  "congratulations",
  "successfully logged in",
  "logged in successfully",
];

/**
 * Pieza programable (Opción A): reglas de expectativa según credenciales.
 */
class LoginExpectation {
  /**
   * @param {LoginCredentials} credentials
   * @returns {LoginExpectationResult}
   */
  static evaluate(credentials) {
    LoginExpectation.#assertCredentialsShape(credentials);

    const { username, password } = LoginExpectation.#normalize(credentials);

    if (!username || !password) {
      return LoginExpectation.#failure(MSG_USER_INVALID, "empty_credentials");
    }

    if (username === VALID_USER && password === VALID_PASSWORD) {
      return {
        shouldSucceed: true,
        expectedUrlContains: SUCCESS_URL,
        expectedMessage: MSG_SUCCESS,
        reason: "valid_credentials",
      };
    }

    if (username !== VALID_USER && password === VALID_PASSWORD) {
      return LoginExpectation.#failure(MSG_USER_INVALID, "invalid_username");
    }

    if (username === VALID_USER && password !== VALID_PASSWORD) {
      return LoginExpectation.#failure(MSG_PASS_INVALID, "invalid_password");
    }

    return LoginExpectation.#failure(MSG_USER_INVALID, "invalid_credentials");
  }

  /**
   * Textos aceptados en la página de éxito (sitio puede variar redacción).
   * @returns {string[]}
   */
  static successTextAliases() {
    return [...SUCCESS_TEXT_ALIASES];
  }

  /**
   * @param {unknown} credentials
   */
  static #assertCredentialsShape(credentials) {
    if (credentials === null || credentials === undefined) {
      throw new LoginExpectationError(
        "credentials object is required (got null/undefined)",
      );
    }
    if (typeof credentials !== "object" || Array.isArray(credentials)) {
      throw new LoginExpectationError(
        "credentials must be a plain object with username and password",
      );
    }
    const { username, password } = credentials;
    if (username === undefined || password === undefined) {
      throw new LoginExpectationError(
        "username and password properties are required",
      );
    }
  }

  /**
   * @param {LoginCredentials} credentials
   * @returns {LoginCredentials}
   */
  static #normalize(credentials) {
    return {
      username: String(credentials.username).trim(),
      password: String(credentials.password),
    };
  }

  /**
   * @param {string} message
   * @param {string} reason
   * @returns {LoginExpectationResult}
   */
  static #failure(message, reason) {
    return {
      shouldSucceed: false,
      expectedUrlContains: null,
      expectedMessage: message,
      reason,
    };
  }
}

export default LoginExpectation;
