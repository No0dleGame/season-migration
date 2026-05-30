# 中国地图集成与足迹标点 Spec

## Why
用户在长达一年的“追寻舒适气候”全国迁徙中，需要直观地看到自己的旅行轨迹。引入一个免费的、无需配置API Key的可视化地图，不仅能显示当前的真实地理位置，还能让用户在地图上点击标记“下一个目标地点”，从而更好地规划每周 400 公里的行程。

## What Changes
- 引入开源免费的地图方案：`leaflet` 和 `react-leaflet`，并使用 OpenStreetMap 作为底图。
- 新增 `TravelMap.jsx` 组件，用于渲染地图。
- 在地图上根据已获取的 GPS 坐标（`locationData`）显示“当前位置”的标记（Marker）。
- 允许用户在地图上点击，放置一个“下一个目标”的标记，并将其坐标保存到 `localStorage` 中以便下次打开页面时恢复。
- 在 `App.jsx` 的右侧（PC端）或底部（移动端）集成该地图组件。

## Impact
- Affected specs: 无
- Affected code: `package.json` (新增依赖), `src/components/TravelMap.jsx` (新组件), `src/App.jsx` (集成地图), `src/utils/storage.js` (新增目标地点存储逻辑)。

## ADDED Requirements
### Requirement: 可是化地图展示与标点
系统必须提供一个交互式地图，展示用户当前位置并允许标记未来目的地。

#### Scenario: 查看当前位置
- **WHEN** 用户成功获取到 GPS 定位
- **THEN** 地图会自动以当前位置为中心，并在该位置显示一个显眼的标记。

#### Scenario: 规划下一站
- **WHEN** 用户在地图上的任意位置点击
- **THEN** 该位置会出现一个代表“下一站”的标记，同时系统会自动将该坐标持久化到本地，刷新不丢失。