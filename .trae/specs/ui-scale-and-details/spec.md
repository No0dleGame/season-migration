# UI Scale and Address Details Spec

## Why
当前 UI 在手机和电脑端显得过大，占用了较多的屏幕空间，需要整体缩小（调整内边距、字号、面板宽度等）。此外，当前位置信息不够详细，且所有展示地址的地方都缺乏快速复制的功能，这不便于用户将地址提取到外部导航或记录软件中。

## What Changes
- **UI 整体缩小**：
  - 全局调整各面板（如 `StatusBar`、`TargetPointsList`、左侧控制面板）的 Padding、Gap、文字大小。
  - 左侧面板和右侧目标点列表在 PC 端的最大宽度适度缩小（例如 `w-96` -> `w-80`，`w-80` -> `w-72`）。
- **当前定位详细化**：
  - 在 `useLocationAndWeather.js` 中，除了获取 `city`，一并获取 `detailedAddress`（详细地址）。
  - `StatusBar.jsx` 中优先展示 `detailedAddress`，让定位信息更加精确。
- **一键复制功能**：
  - 编写一个可复用的 `CopyButton` 组件（或直接在行内实现）。
  - 在 `StatusBar.jsx` 的地址旁、以及 `TargetPointsList.jsx` 的每个目标点地址旁，添加该复制按钮。点击后将地址写入系统剪贴板，并给予轻量级的视觉反馈。

## Impact
- Affected specs: 页面整体布局、字体排版、定位精度、剪贴板交互。
- Affected code: 
  - `src/App.jsx`
  - `src/components/StatusBar.jsx`
  - `src/components/TargetPointsList.jsx`
  - `src/components/Timeline.jsx` (调整大小)
  - `src/components/GameCheckIn.jsx` (调整大小)
  - `src/components/LocationCheckIn.jsx` (调整大小)
  - `src/hooks/useLocationAndWeather.js`

## MODIFIED Requirements
### Requirement: UI 尺寸适配
The system SHALL use a more compact UI design, reducing paddings, margins, text sizes, and container widths to fit more content on both mobile and desktop screens.

### Requirement: 详细定位展示
The system SHALL fetch and display a detailed address for the user's current location instead of just the city name.

### Requirement: 地址快速复制
The system SHALL provide a copy button next to any displayed address (current location and target points) to allow users to quickly copy the address text to their clipboard.
