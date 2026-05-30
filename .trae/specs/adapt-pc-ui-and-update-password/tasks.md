# Tasks
- [x] Task 1: 密码更新与登录页优化
  - [x] SubTask 1.1: 在 `Login.jsx` 中将硬编码密码修改为 `19991123`。
  - [x] SubTask 1.2: 移除 `Login.jsx` 中的密码提示文本和 placeholder。
- [x] Task 2: PC 端 UI 适配
  - [x] SubTask 2.1: 修改 `App.jsx` 的外层容器，在 `md` 和 `lg` 断点下扩大容器最大宽度（如 `max-w-5xl`）。
  - [x] SubTask 2.2: 使用 Grid 布局在 PC 端将打卡操作区（状态栏、游戏打卡、地点打卡）与展示区（时间轴）分列显示，而在移动端保持单列堆叠。
  - [x] SubTask 2.3: 移除或修改子组件内部写死的 `max-w-md` 限制，使其能自适应父容器的宽度。