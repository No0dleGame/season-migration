# Tasks
- [x] Task 1: 数据与逻辑层支持
  - [x] SubTask 1.1: 在 `src/App.jsx` 中新增 `handleToggleTargetPoint` 方法，用于翻转指定索引目标点的 `checkedIn` 状态，并保存至本地存储。
  - [x] SubTask 1.2: 将 `handleToggleTargetPoint` 方法传递给 `TargetPointsList` 组件。
- [x] Task 2: 目标点列表 UI 更新
  - [x] SubTask 2.1: 在 `src/components/TargetPointsList.jsx` 中为每个目标点添加一个勾选框（Checkbox）或状态切换按钮。
  - [x] SubTask 2.2: 根据 `checkedIn` 状态更新列表项的样式（已打卡项添加删除线、变灰等视觉弱化效果）。
- [x] Task 3: 地图标记 UI 更新
  - [x] SubTask 3.1: 在 `src/components/TravelMap.jsx` 中新增一种用于已打卡状态的 Marker 图标样式（例如灰色圆点）。
  - [x] SubTask 3.2: 根据传入的 `targetPoints` 数据中的 `checkedIn` 属性，动态渲染对应的 Marker 图标。