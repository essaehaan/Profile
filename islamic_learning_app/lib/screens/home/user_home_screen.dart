import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/auth_controller.dart';

class UserHomeScreen extends StatelessWidget {
  const UserHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<AuthController>(
      builder: (authController) {
        return Scaffold(
          backgroundColor: Colors.grey[50],
          appBar: AppBar(
            title: const Text(
              'Islamic Learning',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            backgroundColor: Colors.green[700],
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
                        authController.currentUser?.name[0] ?? 'U',
                        style: TextStyle(
                          color: Colors.green[700],
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
                          authController.currentUser?.name ?? 'User',
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
              // Settings/Profile button
              IconButton(
                onPressed: () => _showProfileOptions(context, authController),
                icon: const Icon(Icons.more_vert, color: Colors.white),
                tooltip: 'Options',
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
                      colors: [Colors.green[600]!, Colors.green[400]!],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Assalamu Alaikum,',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        authController.currentUser?.name ?? 'User',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 10),
                      const Text(
                        'Continue your Islamic learning journey',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 30),

                // Learning progress
                if (!authController.isGuest) ...[
                  const Text(
                    'Your Progress',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 15),
                  
                  Row(
                    children: [
                      Expanded(
                        child: _buildProgressCard(
                          'Quizzes Completed',
                          '12',
                          Icons.quiz,
                          Colors.blue,
                          0.6,
                        ),
                      ),
                      const SizedBox(width: 15),
                      Expanded(
                        child: _buildProgressCard(
                          'Books Read',
                          '5',
                          Icons.book,
                          Colors.orange,
                          0.3,
                        ),
                      ),
                    ],
                  ),
                  
                  const SizedBox(height: 30),
                ],

                // Learning categories
                const Text(
                  'Learning Categories',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),

                const SizedBox(height: 15),

                // Categories grid
                GridView.count(
                  crossAxisCount: 2,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisSpacing: 15,
                  mainAxisSpacing: 15,
                  children: [
                    _buildCategoryCard(
                      'Quran',
                      'Learn and practice',
                      Icons.menu_book,
                      Colors.green,
                      () => _navigateToQuran(),
                    ),
                    _buildCategoryCard(
                      'Hadith',
                      'Study sayings',
                      Icons.format_quote,
                      Colors.blue,
                      () => _navigateToHadith(),
                    ),
                    _buildCategoryCard(
                      'Prayers',
                      'Prayer times & guides',
                      Icons.access_time,
                      Colors.purple,
                      () => _navigateToPrayers(),
                    ),
                    _buildCategoryCard(
                      'Islamic History',
                      'Learn our heritage',
                      Icons.history_edu,
                      Colors.orange,
                      () => _navigateToHistory(),
                    ),
                    _buildCategoryCard(
                      'Arabic',
                      'Learn the language',
                      Icons.language,
                      Colors.teal,
                      () => _navigateToArabic(),
                    ),
                    _buildCategoryCard(
                      'Quiz Practice',
                      'Test your knowledge',
                      Icons.quiz,
                      Colors.red,
                      () => _navigateToQuizzes(),
                    ),
                  ],
                ),

                const SizedBox(height: 30),

                // Recent activities or recommendations
                const Text(
                  authController.isGuest ? 'Recommended for You' : 'Continue Learning',
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
                      _buildLearningItem(
                        'Basic Islamic Principles Quiz',
                        'Test your knowledge of fundamental concepts',
                        Icons.quiz,
                        Colors.green,
                        '15 min',
                      ),
                      const Divider(height: 1),
                      _buildLearningItem(
                        'Daily Duas Collection',
                        'Essential prayers for everyday life',
                        Icons.favorite,
                        Colors.blue,
                        '10 min',
                      ),
                      const Divider(height: 1),
                      _buildLearningItem(
                        'Stories of the Prophets',
                        'Learn from the lives of messengers',
                        Icons.history_edu,
                        Colors.orange,
                        '25 min',
                      ),
                      const Divider(height: 1),
                      _buildLearningItem(
                        'Arabic Alphabet Practice',
                        'Master the basics of Arabic script',
                        Icons.language,
                        Colors.purple,
                        '20 min',
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

  Widget _buildProgressCard(
    String title,
    String value,
    IconData icon,
    Color color,
    double progress,
  ) {
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
          const SizedBox(height: 15),
          Text(
            title,
            style: const TextStyle(
              fontSize: 14,
              color: Colors.grey,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 10),
          LinearProgressIndicator(
            value: progress,
            backgroundColor: color.withOpacity(0.2),
            valueColor: AlwaysStoppedAnimation<Color>(color),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(
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
          mainAxisAlignment: MainAxisAlignment.center,
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

  Widget _buildLearningItem(
    String title,
    String description,
    IconData icon,
    Color color,
    String duration,
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
          fontWeight: FontWeight.w600,
        ),
      ),
      subtitle: Text(
        description,
        style: const TextStyle(
          fontSize: 12,
          color: Colors.grey,
        ),
      ),
      trailing: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(
          duration,
          style: TextStyle(
            fontSize: 10,
            color: color,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      onTap: () {
        Get.snackbar(
          'Info',
          'Starting: $title',
          backgroundColor: color,
          colorText: Colors.white,
        );
      },
    );
  }

  void _showProfileOptions(BuildContext context, AuthController authController) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.person),
                title: const Text('Profile'),
                onTap: () {
                  Navigator.pop(context);
                  Get.snackbar(
                    'Info',
                    'Profile feature coming soon!',
                    backgroundColor: Colors.blue,
                    colorText: Colors.white,
                  );
                },
              ),
              ListTile(
                leading: const Icon(Icons.settings),
                title: const Text('Settings'),
                onTap: () {
                  Navigator.pop(context);
                  Get.snackbar(
                    'Info',
                    'Settings feature coming soon!',
                    backgroundColor: Colors.blue,
                    colorText: Colors.white,
                  );
                },
              ),
              if (!authController.isGuest)
                ListTile(
                  leading: const Icon(Icons.star),
                  title: const Text('Achievements'),
                  onTap: () {
                    Navigator.pop(context);
                    Get.snackbar(
                      'Info',
                      'Achievements feature coming soon!',
                      backgroundColor: Colors.blue,
                      colorText: Colors.white,
                    );
                  },
                ),
              const Divider(),
              ListTile(
                leading: const Icon(Icons.logout, color: Colors.red),
                title: const Text('Logout', style: TextStyle(color: Colors.red)),
                onTap: () {
                  Navigator.pop(context);
                  _showLogoutDialog(context, authController);
                },
              ),
            ],
          ),
        );
      },
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

  // Navigation methods for categories
  void _navigateToQuran() {
    Get.snackbar(
      'Info',
      'Quran section coming soon!',
      backgroundColor: Colors.green,
      colorText: Colors.white,
    );
  }

  void _navigateToHadith() {
    Get.snackbar(
      'Info',
      'Hadith section coming soon!',
      backgroundColor: Colors.blue,
      colorText: Colors.white,
    );
  }

  void _navigateToPrayers() {
    Get.snackbar(
      'Info',
      'Prayer section coming soon!',
      backgroundColor: Colors.purple,
      colorText: Colors.white,
    );
  }

  void _navigateToHistory() {
    Get.snackbar(
      'Info',
      'Islamic History section coming soon!',
      backgroundColor: Colors.orange,
      colorText: Colors.white,
    );
  }

  void _navigateToArabic() {
    Get.snackbar(
      'Info',
      'Arabic learning section coming soon!',
      backgroundColor: Colors.teal,
      colorText: Colors.white,
    );
  }

  void _navigateToQuizzes() {
    Get.snackbar(
      'Info',
      'Quiz section coming soon!',
      backgroundColor: Colors.red,
      colorText: Colors.white,
    );
  }
}
