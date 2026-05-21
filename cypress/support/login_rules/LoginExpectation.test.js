import { describe, it, expect } from "vitest";
import LoginExpectation, { LoginExpectationError } from "./LoginExpectation.js";

describe("LoginExpectation", () => {
  it("returns success for valid credentials", () => {
    const result = LoginExpectation.evaluate({
      username: "student",
      password: "Password123",
    });

    expect(result).toEqual({
      shouldSucceed: true,
      expectedUrlContains: "/logged-in-successfully/",
      expectedMessage: "Congratulations",
      reason: "valid_credentials",
    });
  });

  it("returns username error for incorrectUser", () => {
    const result = LoginExpectation.evaluate({
      username: "incorrectUser",
      password: "Password123",
    });

    expect(result.shouldSucceed).toBe(false);
    expect(result.expectedMessage).toBe("Your username is invalid!");
    expect(result.reason).toBe("invalid_username");
  });

  it("returns password error for incorrectPassword", () => {
    const result = LoginExpectation.evaluate({
      username: "student",
      password: "incorrectPassword",
    });

    expect(result.shouldSucceed).toBe(false);
    expect(result.expectedMessage).toBe("Your password is invalid!");
    expect(result.reason).toBe("invalid_password");
  });

  it("treats empty username as invalid username", () => {
    const result = LoginExpectation.evaluate({
      username: "",
      password: "Password123",
    });

    expect(result.shouldSucceed).toBe(false);
    expect(result.expectedMessage).toBe("Your username is invalid!");
    expect(result.reason).toBe("empty_credentials");
  });

  it("treats empty password as invalid username flow", () => {
    const result = LoginExpectation.evaluate({
      username: "student",
      password: "",
    });

    expect(result.shouldSucceed).toBe(false);
    expect(result.reason).toBe("empty_credentials");
  });

  it("trims whitespace in username before evaluating", () => {
    const result = LoginExpectation.evaluate({
      username: "  student  ",
      password: "Password123",
    });

    expect(result.shouldSucceed).toBe(true);
    expect(result.reason).toBe("valid_credentials");
  });

  it("defaults unknown combinations to username invalid", () => {
    const result = LoginExpectation.evaluate({
      username: "other",
      password: "wrong",
    });

    expect(result.expectedMessage).toBe("Your username is invalid!");
    expect(result.reason).toBe("invalid_credentials");
  });

  it("throws when credentials is null", () => {
    expect(() => LoginExpectation.evaluate(null)).toThrow(
      LoginExpectationError,
    );
  });

  it("throws when username or password is undefined", () => {
    expect(() => LoginExpectation.evaluate({ username: "a" })).toThrow(
      /username and password/i,
    );
    expect(() =>
      LoginExpectation.evaluate({ password: "Password123" }),
    ).toThrow(/username and password/i);
  });

  it("exposes success text aliases for UI assertions", () => {
    expect(LoginExpectation.successTextAliases()).toContain("congratulations");
    expect(LoginExpectation.successTextAliases()).toContain(
      "logged in successfully",
    );
  });
});
