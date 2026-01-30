const bcrypt = require('bcryptjs');

/**
 * Authenticates a user with username and password
 * @param {string} username - The username to authenticate
 * @param {string} password - The plain text password to verify
 * @returns {Promise<Object|boolean>} Returns an object with userId and token on success, false on failure
 */
async function authenticateUser(username, password) {
  if (!username || !password) {
    return false;
  }

  try {
    const user = await getUserFromDatabase(username);
    
    if (!user) {
      // Perform a dummy bcrypt comparison to prevent timing attacks
      await bcrypt.compare(password, "$2b$10$dummyhashtopreventtimingattacks1234567890");
      return false;
    }

    // FIXED: Use bcrypt to securely compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (isPasswordValid) {
      return {
        userId: user.id,
        token: generateToken(user.id)
      };
    }

    return false;
  } catch (error) {
    // Handle bcrypt errors gracefully without exposing details
    return false;
  }
}

/**
 * Mock database function to retrieve a user by username
 * @param {string} username - The username to look up
 * @returns {Promise<Object|null>} Returns user object with hashed password or null if not found
 */
async function getUserFromDatabase(username) {
  // FIXED: Store hashed password instead of plain text
  // This hash was created using: bcrypt.hash("password123", 10)
  
  // Mock database - only return user if username matches
  if (username === "admin") {
    return {
      id: "u-123",
      username: username,
      passwordHash: "$2b$10$oCIkdIuME7GUNHkpNnKODua/Pn/QBRpGXU7PkqrgKxi6fVOcUXjxu"
    };
  }
  
  // Return null for non-existent users
  return null;
}

/**
 * Generates a simple authentication token
 * Note: This is a simplified implementation for demonstration purposes only
 * Production systems should use JWT or similar secure token mechanisms
 * @param {string} userId - The user ID to include in the token
 * @returns {string} A simple token string
 */
function generateToken(userId) {
  return userId + "-" + Date.now();
}

// Example usage - only run when file is executed directly
if (require.main === module) {
  (async () => {
    console.log("Testing authentication with correct password:");
    console.log(await authenticateUser("admin", "password123"));
    
    console.log("\nTesting authentication with incorrect password:");
    console.log(await authenticateUser("admin", "wrongpassword"));
  })();
}

module.exports = { authenticateUser, getUserFromDatabase, generateToken };
