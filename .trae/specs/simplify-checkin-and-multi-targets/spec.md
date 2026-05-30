# 简化驻地打卡与多目标点列表 Spec

## Why
在自驾过程中，用户希望驻地打卡能够更加“一键化”，省去手动输入地点名称和选择住宿类型的繁琐步骤，直接使用当前定位即可；如果定位不准或有更新，能有一个“刷新”按钮重新获取。同时，原本的“下一站”单目标点无法满足长途规划的需求，用户希望能在右侧有一个专门的“目标点列表”，支持在地图上标记多个目标点进行路线规划。

## What Changes
- **简化驻地打卡**：修改 `LocationCheckIn.jsx`，移除“驻地名称”输入框和“住宿类型”选择框。仅展示当前获取到的定位地点，并提供“刷新定位”和“一键打卡”两个按钮。
- **支持多目标点存储**：修改 `storage.js`，将原本的 `nextDestination`（单个坐标对象）升级为 `targetPoints`（坐标对象数组）。
- **地图多点标记**：修改 `TravelMap.jsx`，点击地图时不再是替换唯一的下一站，而是将新坐标追加到 `targetPoints` 数组中，并在地图上渲染出多个红色目标点图钉。
- **右侧目标点列表**：新增 `TargetPointsList.jsx` 组件，并在 `App.jsx` 的右侧（如 `absolute top-20 right-4`）悬浮渲染。该列表显示所有已标记的目标点（可利用经纬度或逆地理编码显示大致名称），并提供“删除”按钮。
- **数据流更新**：在 `App.jsx` 中新增刷新定位的方法并传递给打卡组件；统一管理 `targetPoints` 状态。

## Impact
- Affected specs: 无
- Affected code: `src/components/LocationCheckIn.jsx`, `src/components/TravelMap.jsx`, `src/components/TargetPointsList.jsx` (新增), `src/utils/storage.js`, `src/App.jsx`

## ADDED Requirements
### Requirement: 多目标点规划
用户可以标记和管理多个未来的目的地。

#### Scenario: 增加目标点
- **WHEN** 用户在地图上点击多个不同位置
- **THEN** 地图上出现多个目标点标记，同时右侧的目标点列表中自动新增这些坐标记录。

#### Scenario: 删除目标点
- **WHEN** 用户在右侧列表中点击某个目标点的“删除”按钮
- **THEN** 该目标点从列表中移除，同时地图上的对应标记也会消失。

## MODIFIED Requirements
### Requirement: 极简驻地打卡
- **WHEN** 用户需要记录驻地
- **THEN** 直接点击“打卡”即可记录当前 GPS 位置，无需再输入任何文字。如果位置未更新，可点击“刷新”按钮重新请求定位。