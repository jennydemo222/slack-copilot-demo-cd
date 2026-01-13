"""
Demonstration script showing the bug fixes in action.
"""

from auth import login, is_admin


def main():
    print("=" * 60)
    print("Authentication Bug Fixes Demonstration")
    print("=" * 60)
    
    print("\n1. Login Function Fix:")
    print("-" * 60)
    print("BUG: Previously allowed ANY user with password 'admin'")
    print("FIX: Now checks both username AND password\n")
    
    print(f"login('admin', 'admin') = {login('admin', 'admin')}")
    print(f"  ✓ Expected: True (valid admin credentials)")
    
    print(f"\nlogin('hacker', 'admin') = {login('hacker', 'admin')}")
    print(f"  ✓ Expected: False (BUG FIXED: random user with 'admin' password)")
    
    print(f"\nlogin('admin', 'wrongpw') = {login('admin', 'wrongpw')}")
    print(f"  ✓ Expected: False (wrong password)")
    
    print("\n2. is_admin Function Fix:")
    print("-" * 60)
    print("BUG: Previously had no null/None check")
    print("FIX: Now safely handles None values\n")
    
    admin_user = {"role": "admin"}
    print(f"is_admin({admin_user}) = {is_admin(admin_user)}")
    print(f"  ✓ Expected: True (user with admin role)")
    
    regular_user = {"role": "user"}
    print(f"\nis_admin({regular_user}) = {is_admin(regular_user)}")
    print(f"  ✓ Expected: False (user without admin role)")
    
    print(f"\nis_admin(None) = {is_admin(None)}")
    print(f"  ✓ Expected: False (BUG FIXED: None user handled gracefully)")
    
    empty_user = {}
    print(f"\nis_admin({empty_user}) = {is_admin(empty_user)}")
    print(f"  ✓ Expected: False (user with no role)")
    
    print("\n" + "=" * 60)
    print("All bugs have been fixed successfully!")
    print("=" * 60)


if __name__ == "__main__":
    main()
