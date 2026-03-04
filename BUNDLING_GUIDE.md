# 📦 DraggableWindow - 打包发布指南

## ✨ 版本信息

- **当前版本**: v1.0.0
- **作者**: (待填写)
- **许可证**: MIT
- **构建工具**: Rollup

## 🚀 快速开始

### 方式一：通过 npm 安装（推荐）

```bash
npm install @aggbond/draggable-window
```

### 方式二：通过 CDN 引入

```html
<!-- unpkg -->
<script src="https://unpkg.com/@aggbond/draggable-window/dist/DraggableWindow.min.js"></script>

<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@aggbond/draggable-window/dist/DraggableWindow.min.js"></script>
```

### 方式三：下载本地使用

从 `dist/` 目录中选择合适的文件：
- `DraggableWindow.min.js` - 压缩版（生产环境推荐）
- `DraggableWindow.js` - 未压缩版（开发调试用）
- `DraggableWindow.esm.js` - ES Module 格式
- `DraggableWindow.common.js` - CommonJS 格式

## 📁 打包产物说明

| 文件名 | 格式 | 用途 | 大小 |
|--------|------|------|------|
| `DraggableWindow.min.js` | UMD | 浏览器直接使用（压缩） | ~3KB |
| `DraggableWindow.js` | UMD | 浏览器直接使用（未压缩） | ~7KB |
| `DraggableWindow.esm.js` | ES Module | 现代构建工具 | ~7KB |
| `DraggableWindow.common.js` | CommonJS | Node.js / Webpack | ~7KB |
| `DraggableWindow.d.ts` | TypeScript | 类型定义 | - |

## 💻 使用示例

### 1. 浏览器直接使用（UMD）

```html
<!DOCTYPE html>
<html>
<head>
  <title>基础示例</title>
</head>
<body>
  <div id="myWindow" data-url="https://github.com">拖拽我</div>
  
  <!-- 引入压缩版 -->
  <script src="dist/DraggableWindow.min.js"></script>
  <script>
    new DraggableWindow(document.getElementById('myWindow'));
  </script>
</body>
</html>
```

### 2. ES Module (Vite/Webpack/Rollup)

```javascript
import DraggableWindow from '@aggbond/draggable-window';

const element = document.getElementById('myWindow');
new DraggableWindow(element, {
  container: document.getElementById('container'),
  padding: 20
});
```

### 3. CommonJS (Node.js)

```javascript
const DraggableWindow = require('@aggbond/draggable-window');

const element = document.getElementById('myWindow');
new DraggableWindow(element);
```

### 4. TypeScript

```typescript
import DraggableWindow, { DraggableWindowOptions } from '@aggbond/draggable-window';

const options: DraggableWindowOptions = {
  container: document.getElementById('container'),
  padding: 20
};

new DraggableWindow(element, options);
```

## 🛠️ 开发和构建

### 安装依赖

```bash
npm install
```

### 构建命令

```bash
# 构建所有格式
npm run build

# 监听模式（开发用）
npm run build:watch
```

### 构建产物

执行 `npm run build` 后，会在 `dist/` 目录生成以下文件：

```
dist/
├── DraggableWindow.js          # UMD 未压缩版
├── DraggableWindow.min.js      # UMD 压缩版
├── DraggableWindow.esm.js      # ES Module
├── DraggableWindow.common.js   # CommonJS
└── DraggableWindow.d.ts        # TypeScript 声明
```

## 📋 package.json 配置说明

```json
{
  "main": "dist/DraggableWindow.common.js",     // Node.js 默认入口
  "module": "dist/DraggableWindow.esm.js",      // ES Module 入口
  "browser": "dist/DraggableWindow.min.js",     // 浏览器默认入口
  "unpkg": "dist/DraggableWindow.min.js",       // unpkg CDN
  "jsdelivr": "dist/DraggableWindow.min.js",    // jsDelivr CDN
  "types": "dist/DraggableWindow.d.ts"          // TypeScript 类型定义
}
```

## 🔍 版本号规范

遵循语义化版本规范（Semantic Versioning）：

- **MAJOR.MINOR.PATCH** (例如：1.0.0)
- **MAJOR**: 不兼容的 API 更改
- **MINOR**: 向后兼容的新功能
- **PATCH**: 向后兼容的问题修复

### 更新版本号

```bash
# 修改 package.json 中的 version 字段
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## 👤 作者信息

在 `package.json` 中设置作者信息：

```json
{
  "author": "Your Name <your.email@example.com> (https://yourwebsite.com)"
}
```

## 📝 发布流程

### 发布前检查清单

- [ ] 代码已通过测试
- [ ] 已更新版本号
- [ ] 已更新 CHANGELOG
- [ ] 已构建所有格式 (`npm run build`)
- [ ] 已提交到 Git
- [ ] 已推送到远程仓库

### 发布步骤

```bash
# 1. 本地构建和测试
npm run build
npm pack --dry-run  # 预览发布内容

# 2. 登录 npm
npm login

# 3. 发布
npm publish
```

## 🌐 CDN 链接

### unpkg

- Latest: https://unpkg.com/@aggbond/draggable-window/dist/DraggableWindow.min.js
- Specific version: https://unpkg.com/@aggbond/draggable-window@1.0.0/dist/DraggableWindow.min.js

### jsDelivr

- Latest: https://cdn.jsdelivr.net/npm/@aggbond/draggable-window/dist/DraggableWindow.min.js
- Specific version: https://cdn.jsdelivr.net/npm/@aggbond/draggable-window@1.0.0/dist/DraggableWindow.min.js

## ⚙️ Rollup 配置说明

Rollup 配置文件位于 `rollup.config.js`，包含以下特性：

- ✅ 自动生成带版本号、作者信息的 banner
- ✅ 支持 UMD/ESM/CommonJS 三种格式
- ✅ 使用 Terser 进行代码压缩
- ✅ 生成 Source Map 便于调试
- ✅ 自动处理 Node.js 模块依赖

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

**最后更新**: 2026-03-04
**版本**: v1.0.0