# Auto Import Excel Plan Spec

## Why
在之前的设计中，用户需要手动点击“导入周计划”按钮才能将 Excel 中的计划载入。根据最新的需求，系统应在首次加载时（或者在本地存储中没有目标点数据时）自动读取并导入 Excel 文件中的计划，提供“开箱即用”的体验，去除不必要的手动导入步骤。

## What Changes
- **逻辑层 (`App.jsx`)**：
  - 移除通过按钮触发的 `handleImportExcel` 的 UI 绑定。
  - 在组件挂载并检查到用户已登录且 `targetPoints` 数据为空时，自动调用 Excel 解析逻辑加载数据并初始化。为了避免库未加载完成导致的失败，需要使用轮询或在 `useEffect` 中等待 `window.XLSX` 加载就绪后再执行解析。
- **UI 层 (`TargetPointsList.jsx`)**：
  - 移除顶部的“导入周计划”按钮，精简界面。

## Impact
- Affected specs: 目标点初始化流程。
- Affected code: `src/App.jsx`, `src/components/TargetPointsList.jsx`。

## MODIFIED Requirements
### Requirement: 自动导入 Excel 周计划
The system SHALL automatically load target points from the local Excel file if no target points exist in local storage upon user login.

#### Scenario: User logs in with empty plan
- **WHEN** user logs in and the system detects that local storage for target points is empty
- **THEN** the system automatically fetches the `.xlsx` file, parses it, and populates the target points list without requiring manual interaction.
