# Architecture Rules

使用：

Feature-Based Architecture

结构：

lib/
  core/
  features/
  shared/

每个 feature：

- data
- domain
- presentation

禁止：

- 所有逻辑堆 main.dart
- 全局乱引用
- 页面直接操作数据库