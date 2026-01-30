const { authenticateUser } = require('./auth');

async function runTests() {
  console.log("=== Authentication Security Tests ===\n");
  
  // Test 1: Valid credentials
  console.log("Test 1: Valid username and password");
  const result1 = await authenticateUser("admin", "password123");
  if (result1 && result1.userId && result1.token) {
    console.log("✓ PASSED: Authentication successful with valid credentials");
    console.log(`  User ID: ${result1.userId}`);
    console.log(`  Token: ${result1.token}\n`);
  } else {
    console.log("✗ FAILED: Should authenticate with valid credentials\n");
  }
  
  // Test 2: Invalid password
  console.log("Test 2: Valid username but wrong password");
  const result2 = await authenticateUser("admin", "wrongpassword");
  if (result2 === false) {
    console.log("✓ PASSED: Authentication correctly rejected wrong password\n");
  } else {
    console.log("✗ FAILED: Should reject wrong password\n");
  }
  
  // Test 3: Empty username
  console.log("Test 3: Empty username");
  const result3 = await authenticateUser("", "password123");
  if (result3 === false) {
    console.log("✓ PASSED: Authentication correctly rejected empty username\n");
  } else {
    console.log("✗ FAILED: Should reject empty username\n");
  }
  
  // Test 4: Empty password
  console.log("Test 4: Empty password");
  const result4 = await authenticateUser("admin", "");
  if (result4 === false) {
    console.log("✓ PASSED: Authentication correctly rejected empty password\n");
  } else {
    console.log("✗ FAILED: Should reject empty password\n");
  }
  
  // Test 5: Both empty
  console.log("Test 5: Both username and password empty");
  const result5 = await authenticateUser("", "");
  if (result5 === false) {
    console.log("✓ PASSED: Authentication correctly rejected empty credentials\n");
  } else {
    console.log("✗ FAILED: Should reject empty credentials\n");
  }
  
  // Test 6: Non-existent user (should be handled safely)
  console.log("Test 6: Non-existent user");
  const result6 = await authenticateUser("nonexistent", "password123");
  if (result6 === false) {
    console.log("✓ PASSED: Authentication correctly handled non-existent user\n");
  } else {
    console.log("✗ FAILED: Should reject non-existent user\n");
  }
  
  console.log("=== All Tests Complete ===");
}

runTests().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});
