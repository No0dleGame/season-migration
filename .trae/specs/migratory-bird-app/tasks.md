# Tasks
- [x] Task 1: Android 原生项目初始化
  - [x] SubTask 1.1: 创建基于 Kotlin、Jetpack Compose 和 Material3 的 Android 工程。
  - [x] SubTask 1.2: 搭建 MVVM 及 Feature-Based 架构目录 (`core`, `features`, `shared`)。
- [x] Task 2: 本地数据库与存储设计
  - [x] SubTask 2.1: 集成 Room 数据库。
  - [x] SubTask 2.2: 设计城市、营地、游戏开发打卡记录、灵感、迁徙计划的数据表 (Entity)。
  - [x] SubTask 2.3: 实现本地图片选择、拷贝到私有目录及路径存储逻辑。
- [x] Task 3: UI 与核心功能开发 - 打卡模块
  - [x] SubTask 3.1: 开发“城市打卡”与“营地打卡”页面及 ViewModel。
  - [x] SubTask 3.2: 开发“游戏开发打卡”页面及 ViewModel。
- [x] Task 4: UI 与核心功能开发 - 计划与灵感模块
  - [x] SubTask 4.1: 开发“灵感收集”功能。
  - [x] SubTask 4.2: 开发“年度迁徙计划”管理界面（周视图/列表视图）。
- [x] Task 5: 地图集成与统计导出
  - [x] SubTask 5.1: 集成地图 SDK (如高德或 Mapbox)，实现足迹地图展示。
  - [x] SubTask 5.2: 开发数据统计看板。
  - [x] SubTask 5.3: 实现数据导出为 Markdown 和 CSV 文件的功能。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 2]
- [Task 5] depends on [Task 3], [Task 4]
