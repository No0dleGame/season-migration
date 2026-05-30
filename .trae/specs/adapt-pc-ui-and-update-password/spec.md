# PC端UI适配与密码更新 Spec

## Why
当前应用采用了严格的移动端优先设计（单列窄视图），在PC端（Windows）宽屏下空间利用率不足，视觉体验有待提升。同时，现有的硬编码密码（123）过于简单且存在界面提示，需要更新为更私密的密码并移除提示。

## What Changes
- 修改 `App.jsx` 中的全局容器宽度限制，在 `md`（平板）和 `lg`（PC）断点下采用更宽的布局（例如将打卡区域与历史时间轴采用左右双列布局）。
- 优化各组件在宽屏下的内边距和布局。
- 更新 `Login.jsx` 中的验证逻辑，将密码修改为 `19991123`，并移除所有的密码提示文本或占位符。

## Impact
- Affected specs: 无
- Affected code: `src/App.jsx`, `src/components/Login.jsx`, 以及相关的UI组件。

## ADDED Requirements
### Requirement: PC 端响应式布局
系统在宽屏设备上应充分利用屏幕空间，不再局限于窄版单列。

#### Scenario: PC 端访问主页
- **WHEN** 用户在 Windows PC 端浏览器打开主页
- **THEN** 界面呈现适配宽屏的布局（如左右分栏），状态栏、打卡操作区和时间轴布局更加舒展。

## MODIFIED Requirements
### Requirement: 登录密码验证
将原有的简单密码及提示移除，替换为指定的私密密码。

#### Scenario: 用户登录
- **WHEN** 用户打开登录页
- **THEN** 界面上没有任何密码提示，用户必须输入 `19991123` 才能成功进入主页。