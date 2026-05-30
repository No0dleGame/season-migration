# 权限与UI细节优化 Spec

## Why
在实际使用中，用户希望进一步提升操作效率并精简界面：输入正确密码后免去点击按钮的步骤直接跳转；移除占据屏幕空间的无用“模板就绪”欢迎模块；为了方便向他人展示，需要一个只读的“访客模式”（第二密码）；最后，为了减少平时不必要的视觉干扰，周日移动提醒应仅在真正的周日显示。

## What Changes
- 修改 `Login.jsx`，监听密码输入，当输入完全匹配 `19991123`（管理员）或 `12345678`（访客）时，自动触发登录成功回调并传递身份角色。
- 修改 `utils/storage.js`，将原本的布尔值登录状态扩展为角色标识（`admin` 或 `viewer`）。
- 修改 `App.jsx`，移除包含“Season Migration”和图标的无用展示卡片，将“退出”按钮移至更合理的位置（如右上角悬浮或状态栏内）。
- 修改 `App.jsx`，根据当前登录角色，若为 `viewer`（访客），则不渲染 `GameCheckIn` 和 `LocationCheckIn` 组件。
- 修改 `TravelMap.jsx`，当身份为 `viewer` 时，禁用地图点击标记“下一站”的功能。
- 修改 `StatusBar.jsx`，判断当前系统日期的星期（`new Date().getDay() === 0`），仅在周日时显示“别克E5周日移动”的提醒文案。

## Impact
- Affected specs: 无
- Affected code: `src/components/Login.jsx`, `src/utils/storage.js`, `src/App.jsx`, `src/components/StatusBar.jsx`, `src/components/TravelMap.jsx`

## ADDED Requirements
### Requirement: 访客浏览模式
系统支持多角色权限。

#### Scenario: 访客登录
- **WHEN** 用户在密码框中输入 `12345678`
- **THEN** 自动进入主页，且页面上不显示任何打卡表单，无法在地图上标点，只能浏览时间轴足迹和当前地图位置。

## MODIFIED Requirements
### Requirement: 自动登录与UI精简
- **WHEN** 用户输入正确的密码（管理员或访客）
- **THEN** 无需按回车或点击按钮，页面立即跳转。
- **WHEN** 进入主页后
- **THEN** 不再显示无用的图标欢迎模块，空间留给地图和打卡区。周日提醒仅在周日出现。