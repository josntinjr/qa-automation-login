import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["cypress/support/**/*.test.js"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["cypress/support/login_rules/**/*.js"],
    },
  },
});
