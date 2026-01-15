// Session validation helper
function isSessionValid(session) {
  if (!session) {
    return false;
  }
  const expiresAt = new Date(session.expiresAt);
  if (expiresAt < new Date()) {
    console.log("Session expired");
    return false;
  }
  return true;
}

// Example usage
const session = {
  userId: "123",
  expiresAt: "2023-10-01T10:00:00Z"
};

console.log(isSessionValid(session));

module.exports = { isSessionValid };
