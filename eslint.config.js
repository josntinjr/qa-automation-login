const cypress = require("eslint-plugin-cypress");

module.exports = [
  cypress.configs.recommended,
  {
    files: ["cypress/**/*.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["cypress/support/**/*.test.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
];
