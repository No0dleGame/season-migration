# Track Target Point Status Spec

## Why
目前行程目标点仅记录了位置和地址，无法区分哪些目标点是“已打卡（已访问）”的，哪些是“未打卡（待访问）”的。为了方便用户更好地管理行程进度，需要引入状态区分功能。

## What Changes
- 数据层：在目标点对象中引入 `checkedIn`（布尔值）状态。
- 逻辑层：在 `App.jsx` 中增加切换目标点状态的逻辑 `handleToggleTargetPointStatus`，并持久化到本地存储。
- UI层（列表）：在 `TargetPointsList.jsx` 中增加复选框/切换按钮，允许用户标记目标点为已打卡或未打卡，并对已打卡的项增加视觉弱化（如灰色文本、删除线）。
- UI层（地图）：在 `TravelMap.jsx` 中为已打卡的目标点使用不同的 Marker 图标（如灰色圆点），以便在地图上直观区分待前往和已到达的地点。

## Impact
- Affected specs: 目标点列表功能、地图目标点渲染功能。
- Affected code: `src/App.jsx`, `src/components/TargetPointsList.jsx`, `src/components/TravelMap.jsx`。

## ADDED Requirements
### Requirement: 区分目标点打卡状态
The system SHALL allow users to mark target points as checked-in or unvisited.

#### Scenario: Mark target point as checked-in
- **WHEN** user clicks the check button on an unvisited target point in the list
- **THEN** the target point is marked as checked-in, visually greyed out in the list, and its map marker changes to a checked-in style.

#### Scenario: Unmark target point
- **WHEN** user clicks the check button on a checked-in target point in the list
- **THEN** the target point is restored to unvisited, normal text style in the list, and its map marker changes back to the active style.