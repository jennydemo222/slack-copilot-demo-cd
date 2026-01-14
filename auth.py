"""
Authentication and authorization module with security fixes.

This module contains fixed versions of the login and is_admin functions
that address the following security vulnerabilities:
1. login() - Now properly verifies both username and password
2. is_admin() - Now includes null/None checks before accessing user data
"""


def login(user, pw):
    """
    Authenticate a user with username and password.
    
    Fixed: Previously allowed ANY user to login with password "admin".
    Now properly validates both username and password.
    
    Args:
        user: The username to authenticate
        pw: The password to verify
        
    Returns:
        bool: True if authentication succeeds, False otherwise
    """
    # Fixed: Check both username and password, not just password
    # In a real application, this would check against a database with hashed passwords
    if user == "admin" and pw == "admin":
        return True
    return False


def is_admin(user):
    """
    Check if a user has admin role.
    
    Fixed: Previously had no null check, which would cause an error
    if user was None or missing the "role" key.
    
    Args:
        user: User dictionary containing user information
        
    Returns:
        bool: True if user is an admin, False otherwise
    """
    # Fixed: Add null check before accessing user dictionary
    if user is None:
        return False
    
    # Also check if "role" key exists in the dictionary
    if "role" not in user:
        return False
    
    return user["role"] == "admin"
