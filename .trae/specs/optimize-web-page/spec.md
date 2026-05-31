# Optimize Web Page Spec

## Why
当前网页存在一些性能瓶颈（如不必要的组件重渲染、重复的地理位置请求）、易用性问题（如移动端面板重叠、季节信息硬编码）以及逻辑可以进一步解耦和优化。通过本次优化，能够提升应用整体流畅度，改善移动端用户体验，并使代码结构更加清晰。

## What Changes
- 性能优化：在 `App.jsx` 和 `TravelMap.jsx` 中引入 `React.memo` 和 `useCallback` 以减少重复渲染。
- 性能优化：修复 `TravelMap` 中 `defaultCenter` 每次渲染都生成新数组的问题。
- 性能优化：在 `locationService.js` 中增加内存缓存，避免短时间内重复请求相同的定位/天气数据。
- 易用性优化：在 `App.jsx` 中动态计算当前季节（基于当前月份）并传给 `StatusBar`，替代写死的“春日季”。
- 易用性优化：修复移动端下左侧面板与右侧目标点列表的层叠冲突问题，优化响应式布局体验。
- 逻辑优化：将定位与天气的获取逻辑抽离为自定义 Hook `useLocationAndWeather`。

## Impact
- Affected specs: 页面渲染性能、移动端布局体验。
- Affected code: `src/App.jsx`, `src/components/TravelMap.jsx`, `src/components/TargetPointsList.jsx`, `src/utils/locationService.js`。

## MODIFIED Requirements
### Requirement: 性能与渲染优化
The system SHALL use memoization to avoid redundant DOM updates, especially for the heavy Map component. Location data SHALL be cached.

### Requirement: 易用性与响应式优化
The system SHALL display the correct season based on the actual date. The system SHALL display UI panels correctly on mobile devices without overlapping each other awkwardly.

### Requirement: 代码逻辑与结构优化
The system SHALL use a custom React hook to manage location and weather state, reducing the complexity of the main App component.
