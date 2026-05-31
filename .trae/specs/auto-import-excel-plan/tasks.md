# Tasks
- [ ] Task 1: UI 移除手动导入按钮
  - [ ] SubTask 1.1: 在 `src/components/TargetPointsList.jsx` 中移除 `onImportExcel` 相关属性和渲染的“导入周计划”按钮。
  - [ ] SubTask 1.2: 在 `src/App.jsx` 的渲染树中移除传递给 `TargetPointsList` 的 `onImportExcel`。
- [ ] Task 2: 实现自动导入逻辑
  - [ ] SubTask 2.1: 在 `src/App.jsx` 中，将原本的 `handleImportExcel` 逻辑重构为一个返回 Promise 的异步加载函数。
  - [ ] SubTask 2.2: 在加载目标点数据（`loadTargetPoints` 或对应的 `useEffect`）时增加判断：如果从本地存储中获取的数据为空数组 `[]`，则尝试等待 `window.XLSX` 加载完成并自动执行解析，将结果设置为初始的 `targetPoints` 并存入本地存储。
