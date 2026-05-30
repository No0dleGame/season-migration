# Tasks
- [x] Task 1: 改造地图点击事件
  - [x] SubTask 1.1: 在 `src/components/TravelMap.jsx` 中，找到 `MapClickHandler` 组件。
  - [x] SubTask 1.2: 移除 `click` 事件监听，替换为 `mouseup`（或 `mousedown`）以及 `contextmenu` 事件。
  - [x] SubTask 1.3: 在 `mouseup` 回调中，检查 `e.originalEvent.button === 1`。如果是，则调用 `onMapClick(e.latlng)`。
  - [x] SubTask 1.4: 在 `contextmenu`（右键/移动端长按）回调中，调用 `onMapClick(e.latlng)` 以兼顾手机端体验。