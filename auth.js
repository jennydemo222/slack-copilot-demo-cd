const bcrypt = require("bcrypt");
const crypto = require("crypto");

/**
 * Authenticates a user by verifying credentials against the database.
 *
 * Security fix: passwords are compared using bcrypt.compare() instead of
 * plain-text equality (===), so stored hashes are never exposed and the
 * comparison is resistant to timing attacks.
 *
 * @param {string} username
 * @param {string} password  - plain-text password supplied by the caller
 * @returns {Promise<{userId: string, token: string}|false>}
 */
async function authenticateUser(username, password) {
  if (!username || !password) {
    return false;
  }

  const user = await getUserFromDatabase(username);
  if (!user) {
    return false;
  }

  // Use bcrypt.compare to securely verify the password against the stored hash.
  // Plain-text comparison (user.password === password) is intentionally avoided
  // because it would expose the stored value and be vulnerable to timing attacks.
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return false;
  }

  return { userId: user.id, token: generateToken(user.id) };
}

// ---------------------------------------------------------------------------
// Mock helpers (replace with real DB calls in production)
// ---------------------------------------------------------------------------

/**
 * Returns a user record whose passwordHash was produced by bcrypt.
 * In production this would query a real database.
 */
async function getUserFromDatabase(username) {
  // Hash for "password123" – generated once with bcrypt.hash("password123", 10)
  const storedHash =
    "$2b$10$Ts/uBzUQNe2PRmX9TPQZLeXkBPAQKqiKuY7AfY7RmTQZtum7kmLE2";
  return { id: "u-123", username: username, passwordHash: storedHash };
}

function generateToken(userId) {
  // Use a cryptographically secure random token rather than a predictable
  // userId + timestamp combination, which could be guessed or forged.
  const randomPart = crypto.randomBytes(32).toString("hex");
  return userId + "-" + randomPart;
}

// ---------------------------------------------------------------------------
// Example usage
// ---------------------------------------------------------------------------
if (require.main === module) {
  authenticateUser("admin", "password123").then((result) => {
    console.log(result);
  });
}

module.exports = { authenticateUser, getUserFromDatabase, generateToken };
