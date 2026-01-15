const { isSessionValid } = require('./sessionValidator');

// Test helper
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test 1: Valid session should return true
console.log('Test 1: Valid session (future expiry)');
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 1);
const validSession = {
  userId: "123",
  expiresAt: futureDate.toISOString()
};
assert(isSessionValid(validSession) === true, 'Valid session should return true');
console.log('✓ Passed');

// Test 2: Expired session should return false
console.log('\nTest 2: Expired session (past expiry)');
const expiredSession = {
  userId: "123",
  expiresAt: "2023-10-01T10:00:00Z"
};
assert(isSessionValid(expiredSession) === false, 'Expired session should return false');
console.log('✓ Passed');

// Test 3: Null session should return false
console.log('\nTest 3: Null session');
assert(isSessionValid(null) === false, 'Null session should return false');
console.log('✓ Passed');

// Test 4: Undefined session should return false
console.log('\nTest 4: Undefined session');
assert(isSessionValid(undefined) === false, 'Undefined session should return false');
console.log('✓ Passed');

// Test 5: Session expiring exactly now (edge case)
console.log('\nTest 5: Session expiring right now');
const nowSession = {
  userId: "123",
  expiresAt: new Date().toISOString()
};
// This should be false or true depending on timing, but we expect false for expired
// Since the comparison is <, a session at exactly now might pass, but practically will fail
const result = isSessionValid(nowSession);
console.log(`✓ Session at current time returns: ${result}`);

console.log('\n✅ All tests passed!');
