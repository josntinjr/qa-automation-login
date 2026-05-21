const { defineConfig } = require("cypress");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const { validateCypressEnv } = require("./cypress/support/config/envValidator");

module.exports = defineConfig({
  env: {
    LOGIN_PATH: process.env.CYPRESS_LOGIN_PATH || "/practice-test-login/",
    VALID_USER: process.env.CYPRESS_VALID_USER || "student",
    VALID_PASSWORD: process.env.CYPRESS_VALID_PASSWORD || "Password123",
  },
  e2e: {
    baseUrl:
      process.env.CYPRESS_BASE_URL || "https://practicetestautomation.com",
    specPattern: "cypress/e2e/**/*.spec.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      timestamp: "mmddyyyy_HHMMss",
    },
    setupNodeEvents(on, config) {
      validateCypressEnv(config);
      return config;
    },
  },
});
