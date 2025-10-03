import 'package:get/get.dart';
import 'package:flutter/material.dart';

enum UserRole {
  admin,
  user,
  guest,
}

class User {
  final String id;
  final String name;
  final String email;
  final UserRole role;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
  });
}

class AuthController extends GetxController {
  // State variables
  bool isLoading = false;
  User? currentUser;
  bool isLoggedIn = false;

  // Mock credentials
  final Map<String, Map<String, dynamic>> mockUsers = {
    'admin@islamic.com': {
      'password': 'admin123',
      'user': User(
        id: 'admin_001',
        name: 'Admin User',
        email: 'admin@islamic.com',
        role: UserRole.admin,
      ),
    },
    'user@example.com': {
      'password': 'password',
      'user': User(
        id: 'user_001',
        name: 'Regular User',
        email: 'user@example.com',
        role: UserRole.user,
      ),
    },
    'test@example.com': {
      'password': 'password',
      'user': User(
        id: 'user_002',
        name: 'Test User',
        email: 'test@example.com',
        role: UserRole.user,
      ),
    },
  };

  // Login method
  Future<void> login(String email, String password) async {
    try {
      isLoading = true;
      update();

      // Simulate API call delay
      await Future.delayed(const Duration(seconds: 2));

      // Check mock credentials
      if (mockUsers.containsKey(email) && 
          mockUsers[email]!['password'] == password) {
        currentUser = mockUsers[email]!['user'] as User;
        isLoggedIn = true;
        
        // Navigate based on role
        if (currentUser!.role == UserRole.admin) {
          Get.offAllNamed('/admin_dashboard');
        } else {
          Get.offAllNamed('/home');
        }
        
        Get.snackbar(
          'Success',
          'Welcome ${currentUser!.name}!',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
      } else {
        Get.snackbar(
          'Error',
          'Invalid email or password',
          backgroundColor: Colors.red,
          colorText: Colors.white,
        );
      }
    } catch (e) {
      Get.snackbar(
        'Error',
        'Login failed: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isLoading = false;
      update();
    }
  }

  // Guest login
  Future<void> loginAsGuest() async {
    try {
      isLoading = true;
      update();

      await Future.delayed(const Duration(seconds: 1));

      currentUser = User(
        id: 'guest_001',
        name: 'Guest User',
        email: 'guest@example.com',
        role: UserRole.guest,
      );
      isLoggedIn = true;
      
      Get.offAllNamed('/home');
      
      Get.snackbar(
        'Success',
        'Welcome Guest!',
        backgroundColor: Colors.blue,
        colorText: Colors.white,
      );
    } catch (e) {
      Get.snackbar(
        'Error',
        'Guest login failed: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isLoading = false;
      update();
    }
  }

  // Signup method
  Future<void> signup(String name, String email, String password) async {
    try {
      isLoading = true;
      update();

      await Future.delayed(const Duration(seconds: 2));

      // Create new user
      currentUser = User(
        id: 'user_${DateTime.now().millisecondsSinceEpoch}',
        name: name,
        email: email,
        role: UserRole.user,
      );
      isLoggedIn = true;

      // Add to mock users for future login
      mockUsers[email] = {
        'password': password,
        'user': currentUser!,
      };

      Get.offAllNamed('/home');
      
      Get.snackbar(
        'Success',
        'Account created successfully!',
        backgroundColor: Colors.green,
        colorText: Colors.white,
      );
    } catch (e) {
      Get.snackbar(
        'Error',
        'Signup failed: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isLoading = false;
      update();
    }
  }

  // Logout method
  Future<void> logout() async {
    try {
      isLoading = true;
      update();

      await Future.delayed(const Duration(seconds: 1));

      currentUser = null;
      isLoggedIn = false;
      
      Get.offAllNamed('/login');
      
      Get.snackbar(
        'Success',
        'Logged out successfully!',
        backgroundColor: Colors.blue,
        colorText: Colors.white,
      );
    } catch (e) {
      Get.snackbar(
        'Error',
        'Logout failed: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isLoading = false;
      update();
    }
  }

  // Check if user is admin
  bool get isAdmin => currentUser?.role == UserRole.admin;

  // Check if user is guest
  bool get isGuest => currentUser?.role == UserRole.guest;

  // Get user role string
  String get userRoleString {
    switch (currentUser?.role) {
      case UserRole.admin:
        return 'Admin';
      case UserRole.user:
        return 'User';
      case UserRole.guest:
        return 'Guest';
      default:
        return 'Unknown';
    }
  }
}
