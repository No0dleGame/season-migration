# 地图交互与视觉优化 Spec

## Why
用户在使用全屏地图时发现，PC端左侧的浮窗面板遮挡了 Leaflet 默认在左上角的缩放控件（加减号）。同时，用户希望能够通过鼠标滚轮更便捷地缩放地图，进入页面后地图能自动聚焦于当前定位点，并且希望“当前位置”和“下一站（目标点）”能用不同的颜色标记以示区分。

## What Changes
- **缩放控件移位**：关闭 `MapContainer` 默认的 `zoomControl`，并手动引入 `<ZoomControl position="topright" />` 将其移至屏幕右上角。
- **开启滚轮缩放**：将 `MapContainer` 的 `scrollWheelZoom` 属性由 `false` 修改为 `true`。
- **动态居中**：在 `TravelMap.jsx` 中新增子组件 `MapCenterUpdater`，利用 `useMap` Hook 监听 `currentLocation` 的变化，当获取到坐标后调用 `map.flyTo()` 平滑移动至该点。
- **自定义标记颜色**：使用 `L.divIcon` 结合 Tailwind CSS 及自定义 SVG 图标，为“当前位置”和“下一站”创建两种视觉差异明显的 Marker 样式（如当前位置用蓝色/绿色，下一站用醒目的红色/橙色）。

## Impact
- Affected specs: 无
- Affected code: `src/components/TravelMap.jsx`

## ADDED Requirements
### Requirement: 智能聚焦与滚轮操作
地图能够自动定位，并且交互符合用户直觉。

#### Scenario: 首次获取定位
- **WHEN** 应用成功通过 GPS 获取到用户的当前位置
- **THEN** 地图视角会自动平滑移动（飞行动画）并聚焦到该当前位置。

#### Scenario: 使用鼠标浏览
- **WHEN** 用户在 PC 端使用鼠标滚轮滚动
- **THEN** 地图能够根据滚轮方向放大或缩小。

### Requirement: 视觉差异化标点
当前坐标与目标坐标需能被轻易区分。

#### Scenario: 查看地图
- **WHEN** 地图上同时存在当前位置和下一站
- **THEN** 两个位置的图钉标记在颜色和样式上完全不同（例如当前为绿色，目标为红色）。