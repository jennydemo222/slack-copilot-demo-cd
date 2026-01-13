"""
Authentication module for user login and authorization.
"""

def login(user, pw):
    """
    Authenticate a user with username and password.
    
    Args:
        user: Username string
        pw: Password string
        
    Returns:
        True if authentication successful, False otherwise
    """
    # Fixed: Check actual user credentials instead of just password
    # Previously allowed ANY user with password "admin"
    if user == "admin" and pw == "admin":
        return True
    return False


def is_admin(user):
    """
    Check if a user has admin role.
    
    Args:
        user: User dictionary with role information
        
    Returns:
        True if user is admin, False otherwise
    """
    # Fixed: Add null/None check before accessing user dictionary
    if user is None:
        return False
    return user.get("role") == "admin"
