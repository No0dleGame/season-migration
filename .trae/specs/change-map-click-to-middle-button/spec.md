# 修改地图选点交互 Spec

## Why
目前在地图上使用“左键点击”会直接添加目标点。但这与用户习惯中“左键拖拽移动地图”的交互容易产生冲突（在拖拽结束时可能会误触添加标记）。为了将“浏览”与“编辑”行为彻底分开，用户希望“左键”纯粹用于移动地图，而“中键点击（滚轮点击）”专门用于添加新的目标点。

## What Changes
- **修改地图事件监听**：在 `TravelMap.jsx` 中，将 `useMapEvents` 监听的 `click` 事件替换为监听 `mouseup` 或 `mousedown`。
- **按键判断逻辑**：在事件回调中，通过读取原生事件的按键属性（`e.originalEvent.button === 1`）来判断是否为鼠标中键。只有当中键点击时，才触发添加目标点的回调。
- **兼容性补充（可选）**：考虑到手机端没有鼠标中键，将额外绑定 `contextmenu`（长按/右键）作为移动端的选点替代方案。

## Impact
- Affected specs: 无
- Affected code: `src/components/TravelMap.jsx`

## ADDED Requirements
### Requirement: 中键选点与左键拖拽
系统需区分用户的鼠标按键以执行不同的地图操作。

#### Scenario: 浏览地图
- **WHEN** 用户在 PC 端使用鼠标左键在地图上点击或拖拽
- **THEN** 地图仅进行平移移动，不会产生任何新的目标点。

#### Scenario: 规划路线
- **WHEN** 用户在 PC 端使用鼠标中键（滚轮）点击地图某处
- **THEN** 系统在该处添加一个新的目标点。

## MODIFIED Requirements
### Requirement: 移动端选点兼容
- **WHEN** 用户在移动端（无中键设备）长按地图
- **THEN** 系统同样响应该事件，并在长按处添加目标点。