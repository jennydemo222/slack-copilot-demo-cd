"""
Unit tests for authentication and authorization functions.

These tests validate that the security fixes work correctly:
1. login() properly validates both username and password
2. is_admin() handles None/null cases safely
"""

import unittest
from auth import login, is_admin


class TestLogin(unittest.TestCase):
    """Test cases for the login function."""
    
    def test_valid_admin_login(self):
        """Test that admin user can login with correct credentials."""
        self.assertTrue(login("admin", "admin"))
    
    def test_wrong_password(self):
        """Test that login fails with wrong password."""
        self.assertFalse(login("admin", "wrongpassword"))
    
    def test_admin_password_wrong_user(self):
        """
        Test that login fails when password is "admin" but username is not.
        This validates the fix for the bug where ANY user could login with pw="admin".
        """
        self.assertFalse(login("hacker", "admin"))
        self.assertFalse(login("user123", "admin"))
        self.assertFalse(login("", "admin"))
    
    def test_wrong_username(self):
        """Test that login fails with wrong username."""
        self.assertFalse(login("notadmin", "admin"))
    
    def test_both_wrong(self):
        """Test that login fails when both username and password are wrong."""
        self.assertFalse(login("user", "password"))
    
    def test_empty_credentials(self):
        """Test that login fails with empty credentials."""
        self.assertFalse(login("", ""))
        self.assertFalse(login("admin", ""))
        self.assertFalse(login("", "admin"))


class TestIsAdmin(unittest.TestCase):
    """Test cases for the is_admin function."""
    
    def test_admin_user(self):
        """Test that a user with admin role returns True."""
        user = {"role": "admin", "name": "John"}
        self.assertTrue(is_admin(user))
    
    def test_non_admin_user(self):
        """Test that a user without admin role returns False."""
        user = {"role": "user", "name": "Jane"}
        self.assertFalse(is_admin(user))
    
    def test_none_user(self):
        """
        Test that None user returns False instead of crashing.
        This validates the fix for the null check bug.
        """
        self.assertFalse(is_admin(None))
    
    def test_user_without_role(self):
        """Test that a user dictionary without 'role' key returns False."""
        user = {"name": "Bob"}
        self.assertFalse(is_admin(user))
    
    def test_empty_user_dict(self):
        """Test that an empty user dictionary returns False."""
        user = {}
        self.assertFalse(is_admin(user))
    
    def test_user_with_empty_role(self):
        """Test that a user with empty role string returns False."""
        user = {"role": ""}
        self.assertFalse(is_admin(user))
    
    def test_user_with_other_roles(self):
        """Test various non-admin roles return False."""
        roles = ["moderator", "guest", "viewer", "editor"]
        for role in roles:
            user = {"role": role}
            self.assertFalse(is_admin(user), f"User with role '{role}' should not be admin")


if __name__ == "__main__":
    unittest.main()
