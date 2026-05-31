# Import Excel Plan Spec

## Why
用户已将一份《床车一年全国迁徙计划.xlsx》放入项目中，希望能直接将文件中的“周计划”导入为行程的目标点。同时，为了更灵活地规划行程，需要支持对每个目标点的“预计时间”进行编辑。

## What Changes
- **静态资源调整**：将根目录下的 `床车一年全国迁徙计划.xlsx` 移动至 `public/` 目录下，以便前端可以直接请求该文件。
- **解析支持**：在 `index.html` 中引入 `xlsx` (SheetJS) 的 CDN 脚本，或使用 ES Module 动态引入，用于在浏览器端解析 Excel 文件。
- **数据结构升级**：目标点数据增加 `estimatedTime`（预计时间）、`planName`（计划名称）等字段。
- **逻辑层**：
  - 新增解析 Excel 文件的逻辑：请求 `public/床车一年全国迁徙计划.xlsx`，将其转换为 JSON 格式，并提取相关列作为目标点导入。
  - 新增更新目标点预计时间的逻辑。
- **UI 层**：
  - `TargetPointsList.jsx`：顶部增加“导入 Excel 计划”按钮；列表项中展示“预计时间”，并提供编辑（Input）功能。
  - `TravelMap.jsx`：在地图的 Marker Popup 中同步展示目标点的“预计时间”。

## Impact
- Affected specs: 目标点数据源、目标点列表展示与编辑。
- Affected code: `public/`, `index.html`, `src/App.jsx`, `src/components/TargetPointsList.jsx`, `src/components/TravelMap.jsx`。

## ADDED Requirements
### Requirement: 导入 Excel 周计划
The system SHALL provide a feature to import target points from a local Excel file.

#### Scenario: User imports Excel plan
- **WHEN** user clicks the "导入 Excel 计划" button
- **THEN** the system fetches the `.xlsx` file, parses it, extracts the weekly plan rows, and appends them to the target points list.

### Requirement: 编辑目标点预计时间
The system SHALL allow users to view and edit the estimated time for each target point.

#### Scenario: User edits estimated time
- **WHEN** user inputs a new date/time in the estimated time field of a target point
- **THEN** the system updates the target point's data and saves it to local storage.
