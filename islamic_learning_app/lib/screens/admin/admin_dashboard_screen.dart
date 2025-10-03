import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/auth_controller.dart';

class AdminDashboardScreen extends StatelessWidget {
  const AdminDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<AuthController>(
      builder: (authController) {
        return Scaffold(
          backgroundColor: Colors.grey[50],
          appBar: AppBar(
            title: const Text(
              'Admin Dashboard',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            backgroundColor: Colors.teal[700],
            elevation: 0,
            actions: [
              // User profile section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Row(
                  children: [
                    CircleAvatar(
                      backgroundColor: Colors.white,
                      child: Text(
                        authController.currentUser?.name[0] ?? 'A',
                        style: TextStyle(
                          color: Colors.teal[700],
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          authController.currentUser?.name ?? 'Admin',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        Text(
                          authController.userRoleString,
                          style: const TextStyle(
                            color: Colors.white70,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              // Logout button
              IconButton(
                onPressed: () => _showLogoutDialog(context, authController),
                icon: const Icon(Icons.logout, color: Colors.white),
                tooltip: 'Logout',
              ),
            ],
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Welcome section
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.teal[600]!, Colors.teal[400]!],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Welcome Back!',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        authController.currentUser?.name ?? 'Admin',
                        style: const TextStyle(
                          color: Colors.white70,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 10),
                      const Text(
                        'Manage your Islamic Learning App',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 30),

                // Quick stats
                Row(
                  children: [
                    Expanded(
                      child: _buildStatsCard(
                        'Total Users',
                        '1,247',
                        Icons.people,
                        Colors.blue,
                      ),
                    ),
                    const SizedBox(width: 15),
                    Expanded(
                      child: _buildStatsCard(
                        'Active Quizzes',
                        '89',
                        Icons.quiz,
                        Colors.orange,
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 15),

                Row(
                  children: [
                    Expanded(
                      child: _buildStatsCard(
                        'Total Books',
                        '156',
                        Icons.menu_book,
                        Colors.green,
                      ),
                    ),
                    const SizedBox(width: 15),
                    Expanded(
                      child: _buildStatsCard(
                        'Pending Reviews',
                        '23',
                        Icons.pending_actions,
                        Colors.red,
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 30),

                // Management sections
                const Text(
                  'Management',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),

                const SizedBox(height: 15),

                // Management cards
                GridView.count(
                  crossAxisCount: 2,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisSpacing: 15,
                  mainAxisSpacing: 15,
                  children: [
                    _buildManagementCard(
                      'User Management',
                      'Manage users and roles',
                      Icons.manage_accounts,
                      Colors.purple,
                      () => _navigateToUserManagement(),
                    ),
                    _buildManagementCard(
                      'Content Management',
                      'Manage books and quizzes',
                      Icons.library_books,
                      Colors.indigo,
                      () => _navigateToContentManagement(),
                    ),
                    _buildManagementCard(
                      'Quiz Management',
                      'Create and edit quizzes',
                      Icons.quiz_outlined,
                      Colors.teal,
                      () => _navigateToQuizManagement(),
                    ),
                    _buildManagementCard(
                      'Analytics',
                      'View app analytics',
                      Icons.analytics,
                      Colors.green,
                      () => _navigateToAnalytics(),
                    ),
                    _buildManagementCard(
                      'Notifications',
                      'Send notifications',
                      Icons.notifications,
                      Colors.orange,
                      () => _navigateToNotifications(),
                    ),
                    _buildManagementCard(
                      'Settings',
                      'App configuration',
                      Icons.settings,
                      Colors.grey,
                      () => _navigateToSettings(),
                    ),
                  ],
                ),

                const SizedBox(height: 30),

                // Recent activities
                const Text(
                  'Recent Activities',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),

                const SizedBox(height: 15),

                Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(15),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.1),
                        spreadRadius: 2,
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      _buildActivityItem(
                        'New user registered: Ahmad Ali',
                        '2 hours ago',
                        Icons.person_add,
                        Colors.green,
                      ),
                      const Divider(height: 1),
                      _buildActivityItem(
                        'Quiz "Quran Basics" was completed by 15 users',
                        '4 hours ago',
                        Icons.quiz,
                        Colors.blue,
                      ),
                      const Divider(height: 1),
                      _buildActivityItem(
                        'New book "Islamic History" uploaded',
                        '1 day ago',
                        Icons.book,
                        Colors.orange,
                      ),
                      const Divider(height: 1),
                      _buildActivityItem(
                        'System backup completed',
                        '2 days ago',
                        Icons.backup,
                        Colors.purple,
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildStatsCard(String title, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 2,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, color: color, size: 30),
              Text(
                value,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            title,
            style: const TextStyle(
              fontSize: 14,
              color: Colors.grey,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildManagementCard(
    String title,
    String subtitle,
    IconData icon,
    Color color,
    VoidCallback onTap,
  ) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(15),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(15),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.1),
              spreadRadius: 2,
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(height: 15),
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black87,
              ),
            ),
            const SizedBox(height: 5),
            Text(
              subtitle,
              style: const TextStyle(
                fontSize: 12,
                color: Colors.grey,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityItem(
    String title,
    String time,
    IconData icon,
    Color color,
  ) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: color, size: 20),
      ),
      title: Text(
        title,
        style: const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
      ),
      subtitle: Text(
        time,
        style: const TextStyle(
          fontSize: 12,
          color: Colors.grey,
        ),
      ),
    );
  }

  void _showLogoutDialog(BuildContext context, AuthController authController) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Logout'),
          content: const Text('Are you sure you want to logout?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
                authController.logout();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
                foregroundColor: Colors.white,
              ),
              child: authController.isLoading
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : const Text('Logout'),
            ),
          ],
        );
      },
    );
  }

  // Navigation methods for management sections
  void _navigateToUserManagement() {
    Get.snackbar(
      'Info',
      'User Management feature coming soon!',
      backgroundColor: Colors.blue,
      colorText: Colors.white,
    );
  }

  void _navigateToContentManagement() {
    Get.snackbar(
      'Info',
      'Content Management feature coming soon!',
      backgroundColor: Colors.blue,
      colorText: Colors.white,
    );
  }

  void _navigateToQuizManagement() {
    Get.snackbar(
      'Info',
      'Quiz Management feature coming soon!',
      backgroundColor: Colors.blue,
      colorText: Colors.white,
    );
  }

  void _navigateToAnalytics() {
    Get.snackbar(
      'Info',
      'Analytics feature coming soon!',
      backgroundColor: Colors.blue,
      colorText: Colors.white,
    );
  }

  void _navigateToNotifications() {
    Get.snackbar(
      'Info',
      'Notifications feature coming soon!',
      backgroundColor: Colors.blue,
      colorText: Colors.white,
    );
  }

  void _navigateToSettings() {
    Get.snackbar(
      'Info',
      'Settings feature coming soon!',
      backgroundColor: Colors.blue,
      colorText: Colors.white,
    );
  }
}
