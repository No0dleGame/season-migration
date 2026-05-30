# Tasks
- [x] Task 1: 编写位置与天气服务工具
  - [x] SubTask 1.1: 在 `src/utils/` 下创建 `locationService.js`。
  - [x] SubTask 1.2: 实现基于 `navigator.geolocation` 的经纬度获取方法。
  - [x] SubTask 1.3: 实现基于 OpenStreetMap (Nominatim) 的逆地址解析方法（经纬度转城市名）。
  - [x] SubTask 1.4: 实现基于 Open-Meteo API 的实时天气获取方法（经纬度转温度及天气描述）。
- [x] Task 2: 状态集成与组件更新
  - [x] SubTask 2.1: 在 `App.jsx` 中添加获取定位和天气的副作用（`useEffect`），并管理加载状态与结果状态。
  - [x] SubTask 2.2: 修改 `StatusBar.jsx`，接收并渲染真实的城市名称、温度和天气情况，同时处理加载中（Loading）和失败的状态。