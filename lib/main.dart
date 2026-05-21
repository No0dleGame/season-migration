import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';

void main() {
  // 确保 Flutter 绑定初始化
  WidgetsFlutterBinding.ensureInitialized();
  
  // 使用 ProviderScope 包装应用，以启用 Riverpod
  runApp(const ProviderScope(child: SeasonMigrationApp()));
}

/// 应用程序的主入口
class SeasonMigrationApp extends StatelessWidget {
  const SeasonMigrationApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Season Migration',
      debugShowCheckedModeBanner: false,
      // 设置极简暗色主题
      theme: AppTheme.darkTheme,
      home: const MainScreen(),
    );
  }
}

/// 临时主屏幕，后续将替换为导航结构
class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('候鸟迁徙'),
      ),
      body: const Center(
        child: Text(
          '欢迎使用候鸟迁徙 App\n(极简暗色主题)',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
