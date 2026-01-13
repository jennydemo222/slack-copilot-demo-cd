"""
Unit tests for authentication module.
"""

import unittest
from auth import login, is_admin


class TestLogin(unittest.TestCase):
    """Test cases for login function."""
    
    def test_valid_admin_login(self):
        """Test that admin user can login with correct password."""
        self.assertTrue(login("admin", "admin"))
    
    def test_invalid_password(self):
        """Test that admin user cannot login with wrong password."""
        self.assertFalse(login("admin", "wrongpassword"))
    
    def test_bug_fix_any_user_with_admin_password(self):
        """
        Test that arbitrary users cannot login with 'admin' password.
        This test verifies the fix for the bug where any user could login
        with password 'admin'.
        """
        self.assertFalse(login("hacker", "admin"))
        self.assertFalse(login("randomuser", "admin"))
        self.assertFalse(login("", "admin"))
    
    def test_invalid_user(self):
        """Test that invalid users cannot login."""
        self.assertFalse(login("invaliduser", "somepassword"))


class TestIsAdmin(unittest.TestCase):
    """Test cases for is_admin function."""
    
    def test_admin_user(self):
        """Test that user with admin role is identified as admin."""
        admin_user = {"role": "admin"}
        self.assertTrue(is_admin(admin_user))
    
    def test_non_admin_user(self):
        """Test that user without admin role is not identified as admin."""
        regular_user = {"role": "user"}
        self.assertFalse(is_admin(regular_user))
    
    def test_bug_fix_none_user(self):
        """
        Test that None user is handled gracefully.
        This test verifies the fix for the bug where None user would cause
        an error due to missing null check.
        """
        self.assertFalse(is_admin(None))
    
    def test_empty_user_dict(self):
        """Test that user without role is not identified as admin."""
        empty_user = {}
        self.assertFalse(is_admin(empty_user))
    
    def test_user_with_different_role(self):
        """Test that users with different roles are not identified as admin."""
        moderator = {"role": "moderator"}
        guest = {"role": "guest"}
        self.assertFalse(is_admin(moderator))
        self.assertFalse(is_admin(guest))


if __name__ == '__main__':
    unittest.main()
