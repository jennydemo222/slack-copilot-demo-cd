const bcrypt = require("bcrypt");
const { authenticateUser } = require("./auth");

describe("authenticateUser", () => {
  test("returns userId and token for valid credentials", async () => {
    const result = await authenticateUser("admin", "password123");
    expect(result).not.toBe(false);
    expect(result).toHaveProperty("userId", "u-123");
    expect(result).toHaveProperty("token");
    expect(typeof result.token).toBe("string");
  });

  test("returns false for wrong password", async () => {
    const result = await authenticateUser("admin", "wrongpassword");
    expect(result).toBe(false);
  });

  test("returns false when username is missing", async () => {
    const result = await authenticateUser("", "password123");
    expect(result).toBe(false);
  });

  test("returns false when password is missing", async () => {
    const result = await authenticateUser("admin", "");
    expect(result).toBe(false);
  });

  test("returns false when both fields are missing", async () => {
    const result = await authenticateUser("", "");
    expect(result).toBe(false);
  });

  test("password is not compared with plain-text equality", async () => {
    // Verify that the stored value is a bcrypt hash, not the raw password
    const { getUserFromDatabase } = require("./auth");
    const user = await getUserFromDatabase("admin");
    expect(user.passwordHash).not.toBe("password123");
    // Should be a valid bcrypt hash
    expect(user.passwordHash).toMatch(/^\$2[ab]\$\d+\$/);
    // bcrypt.compare must approve the correct password against the hash
    const match = await bcrypt.compare("password123", user.passwordHash);
    expect(match).toBe(true);
  });
});
