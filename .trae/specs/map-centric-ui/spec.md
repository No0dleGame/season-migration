# 地图全屏与浮窗化 UI 改版 Spec

## Why
用户希望获得更具沉浸感的“数字游民/床车旅行”体验，将应用从“仪表盘（Dashboard）”范式转变为“地图为中心（Map-centric）”范式。地图需要占据整个屏幕，而原先的打卡、时间轴等功能将作为浮窗或小弹窗悬浮于地图之上，从而最大化地图的可视区域和交互体验。

## What Changes
- **布局重构**：移除 `App.jsx` 中原有的流式布局（文档流），将根容器设为满屏（`w-screen h-screen relative overflow-hidden`）。
- **地图全屏**：修改 `TravelMap.jsx`，移除原本的高度限制和边框，使其宽高均为 `100%`，并在 `App.jsx` 中作为绝对定位的底层（`z-0`）渲染。
- **状态栏悬浮**：将 `StatusBar` 改为悬浮在左上角的毛玻璃卡片（`absolute top-4 left-4 z-10`）。
- **打卡与时间轴浮窗**：
  - 将 `GameCheckIn`、`LocationCheckIn` 和 `Timeline` 组合放入一个悬浮面板中（玻璃拟态样式）。
  - 在 PC 端，该面板固定悬浮在屏幕左侧或右侧（如 `absolute top-24 left-4`，设置最大高度并支持滚动）。
  - 在移动端，提供一个悬浮按钮（FAB）来展开/收起这个功能面板，避免遮挡整个地图。
- **退出按钮**：保持在右上角悬浮（`absolute top-4 right-4 z-10`）。

## Impact
- Affected specs: 无
- Affected code: `src/App.jsx`, `src/components/TravelMap.jsx`, `src/components/StatusBar.jsx` (可能需要微调样式以适应毛玻璃背景)。

## ADDED Requirements
### Requirement: 全屏地图体验
应用必须以地图作为全屏背景。

#### Scenario: 浏览地图
- **WHEN** 用户进入主页
- **THEN** 地图铺满整个浏览器窗口，用户可以自由拖拽缩放。

### Requirement: 浮窗面板交互
功能组件不能永久遮挡移动端的地图。

#### Scenario: 移动端折叠面板
- **WHEN** 用户在手机上浏览
- **THEN** 打卡和时间轴面板默认收起或可以通过按钮切换显示/隐藏，以保证地图内容可见。

## MODIFIED Requirements
### Requirement: 访客模式适配
- **WHEN** 访客登录
- **THEN** 浮窗内仅显示时间轴（无打卡表单），且地图依然保持全屏且不可标记下一站。