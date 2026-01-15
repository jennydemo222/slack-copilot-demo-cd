# Session Validation Bug Fix

## Problem Identified

The `isSessionValid` function had a critical bug where it would always return `true`, even when a session had expired.

### Buggy Code (Before)
```javascript
function isSessionValid(session) {
  if (!session) {
    return false;
  }
  const expiresAt = new Date(session.expiresAt);
  if (expiresAt < new Date()) {
    console.log("Session expired");
    // BUG: Missing return false here!
  }
  return true; // Always returns true, even for expired sessions
}
```

### Fixed Code (After)
```javascript
function isSessionValid(session) {
  if (!session) {
    return false;
  }
  const expiresAt = new Date(session.expiresAt);
  if (expiresAt < new Date()) {
    console.log("Session expired");
    return false; // FIX: Now correctly returns false for expired sessions
  }
  return true;
}
```

## The Bug

When a session's `expiresAt` date was in the past, the function would:
1. Log "Session expired" to the console
2. **But still return `true`** indicating the session is valid

This is a security vulnerability as expired sessions would be treated as valid.

## The Fix

Added `return false;` after logging "Session expired" to ensure that expired sessions are properly rejected.

## Testing

Run the tests with:
```bash
node sessionValidator.test.js
```

The tests verify:
- ✅ Valid sessions (future expiry) return `true`
- ✅ Expired sessions (past expiry) return `false`
- ✅ Null sessions return `false`
- ✅ Undefined sessions return `false`
- ✅ Edge case: Session expiring at current time
