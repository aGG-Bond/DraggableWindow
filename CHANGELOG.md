# 更新日志 (Changelog)

本文档记录了 DraggableWindow 项目的所有重要更新。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本规范](https://semver.org/lang/zh-CN/)。

---

## [未发布]

### 计划功能
- 添加更多动画效果配置
- 支持拖拽手柄（handle）配置
- 添加拖拽回调函数（onDragStart, onDragMove, onDragEnd）
- 支持禁用拖拽功能

---

## [1.0.0] - 2026-03-04

### ✨ 新增功能

#### 核心功能
- **全平台拖拽支持**
  - PC 端鼠标拖拽（mousedown/mousemove/mouseup）
  - 移动端触摸拖拽（touchstart/touchmove/touchend）
  - 智能设备检测并自动绑定对应事件
  
- **智能拖拽检测**
  - 基于 10px 阈值区分点击和拖拽操作
  - 自动判断是否触发拖拽状态
  - 防止误触提升用户体验

- **边界约束系统**
  - 全局模式：防止窗口移出屏幕可视区域
  - 容器模式：限制在指定 DOM 元素内拖拽
  - 可配置 padding 边距，保持与边界距离

- **定位策略自动切换**
  - 全局模式使用 `position: fixed`
  - 容器模式使用 `position: absolute`
  - 页面滚动时智能处理位置保持

- **点击跳转功能**
  - 支持通过 `data-url` 属性指定跳转链接
  - 拖拽时阻止点击事件，防止误跳转
  - 正常点击时触发链接跳转

#### 工程化特性
- **多格式打包输出**
  - UMD 格式（浏览器直接使用）
  - ES Module 格式（现代构建工具）
  - CommonJS 格式（Node.js/Webpack）
  
- **代码压缩优化**
  - 生产环境压缩版仅 ~3KB
  - 保留完整 Source Map 便于调试
  - 自动生成带版本信息的 Banner

- **TypeScript 类型定义**
  - 完整的 `.d.ts` 类型声明文件
  - IDE 智能提示支持
  - 类型安全的 API 调用

- **NPM 包发布支持**
  - 完善的 package.json 配置
  - 支持 unpkg 和 jsDelivr CDN
  - 符合 npm 包工程化规范

### 📝 文档完善

- **详细使用文档**
  - README.md - 项目主文档
  - QUICKSTART.md - 快速开始指南
  - BUNDLING_GUIDE.md - 打包详细指南
  - CHECKLIST.md - 发布前检查清单
  - NPM_PUBLISH_GUIDE.md - npm 发布流程
  - SUMMARY.md - 完成总结
  - PROJECT_STRUCTURE.md - 项目结构说明

- **示例页面**
  - demo/demo.html - 完整功能演示（区域拖拽）
  - demo/bundle-test.html - 打包版本测试
  - demo/npm-example.html - NPM 使用示例
  - demo/quick-test.html - 快速功能测试

### 🔧 技术实现

- **零依赖** - 纯原生 JavaScript 实现
- **轻量高效** - 核心代码仅 205 行
- **向后兼容** - 支持 ES5+ 和现代浏览器
- **模块化设计** - 支持多种模块系统

### 📦 构建配置

- 使用 Rollup 作为打包工具
- 支持监听模式开发
- 自动注入版本号、作者信息到 Banner
- 生成 Source Map 便于调试

---

## [0.1.0] - 2026-03-03

### 预发布版本

- 基础拖拽功能原型
- 简单的边界检测
- 基础的点击/拖拽区分逻辑

---

## 版本说明

### 语义化版本号格式

```
主版本号。次版本号.修订号
  ↑      ↑      ↑
 MAJOR  MINOR  PATCH
```

- **MAJOR（主版本号）**: 不兼容的 API 更改
- **MINOR（次版本号）**: 向后兼容的新功能
- **PATCH（修订号）**: 向后兼容的问题修复

### 版本标识

- `[未发布]` - 正在开发中的功能
- `[1.0.0]` - 正式版本
- `[0.x.x]` - 预发布版本

---

## 贡献者

感谢所有为 DraggableWindow 做出贡献的开发者！

---

**最后更新**: 2026-03-04  
**当前版本**: v1.0.0  
**项目主页**: https://github.com/aGG-Bond/draggableWindow
