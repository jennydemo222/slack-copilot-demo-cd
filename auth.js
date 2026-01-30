const bcrypt = require('bcryptjs');

// Login helper function
async function authenticateUser(username, password) {
  if (!username || !password) {
    return false;
  }

  const user = await getUserFromDatabase(username);
  
  if (!user) {
    console.log("User not found");
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
}

// Mock helpers
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

function generateToken(userId) {
  return userId + "-" + Date.now();
}

// Example usage
(async () => {
  console.log("Testing authentication with correct password:");
  console.log(await authenticateUser("admin", "password123"));
  
  console.log("\nTesting authentication with incorrect password:");
  console.log(await authenticateUser("admin", "wrongpassword"));
})();

module.exports = { authenticateUser, getUserFromDatabase, generateToken };
