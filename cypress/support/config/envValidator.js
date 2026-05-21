/**
 * Validador de configuración (Opción C): URL y credenciales desde env.
 * @param {import('cypress').PluginConfigOptions} config
 * @returns {import('cypress').PluginConfigOptions}
 */
function validateCypressEnv(config) {
  const baseUrl = config.baseUrl || process.env.CYPRESS_BASE_URL || "";

  if (!baseUrl || typeof baseUrl !== "string") {
    throw new Error(
      "[envValidator] CYPRESS_BASE_URL / baseUrl is required and must be a string.",
    );
  }

  let parsed;
  try {
    parsed = new URL(baseUrl);
  } catch {
    throw new Error(
      `[envValidator] Invalid baseUrl "${baseUrl}". Use a full URL (https://...).`,
    );
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error(`[envValidator] baseUrl must use http or https protocol.`);
  }

  const loginPath = process.env.CYPRESS_LOGIN_PATH || "/practice-test-login/";
  if (!loginPath.startsWith("/")) {
    throw new Error(
      "[envValidator] CYPRESS_LOGIN_PATH must start with '/' (e.g. /practice-test-login/).",
    );
  }

  const validUser = process.env.CYPRESS_VALID_USER;
  const validPassword = process.env.CYPRESS_VALID_PASSWORD;

  if (validUser !== undefined && String(validUser).trim() === "") {
    throw new Error(
      "[envValidator] CYPRESS_VALID_USER cannot be empty when defined.",
    );
  }

  if (validPassword !== undefined && String(validPassword).trim() === "") {
    throw new Error(
      "[envValidator] CYPRESS_VALID_PASSWORD cannot be empty when defined.",
    );
  }

  return config;
}

module.exports = { validateCypressEnv };
