# NPM 包发布配置说明

## ✅ 已完成的配置

### 1. package.json 优化
- ✅ 修正主文件路径：`main: "src/DraggableWindow.js"`
- ✅ 添加 CDN 支持：`unpkg` 和 `jsdelivr` 字段
- ✅ 完善关键词：包含中英文关键词，便于搜索
- ✅ 添加 Node.js 版本要求：`engines.node >= 14.0.0`
- ✅ 指定发布文件列表

### 2. .npmignore 配置
创建 `.npmignore` 文件，排除以下文件不发布到 npm：
- `node_modules/` - 依赖目录
- `.git/` - Git 版本控制
- `.gitignore` - Git 忽略配置
- `*.md` - Markdown 文档（README.md 除外）
- `.DS_Store` - macOS 系统文件

### 3. 模块导出支持
在 `src/DraggableWindow.js` 中添加了多种模块系统的导出：
- ✅ CommonJS (Node.js): `module.exports = DraggableWindow`
- ✅ AMD (RequireJS): `define([], function() { return DraggableWindow; })`
- ✅ 全局变量（浏览器）: `window.DraggableWindow = DraggableWindow`

### 4. 使用示例
- ✅ 更新 README.md，添加 npm 安装说明
- ✅ 创建 `demo/npm-example.html`，展示多种使用方式

## 📦 安装方式

### 1. NPM 安装（推荐）
```bash
npm install draggable-window
```

### 2. Yarn 安装
```bash
yarn add draggable-window
```

### 3. PNPM 安装
```bash
pnpm add draggable-window
```

### 4. CDN 引入
```html
<!-- unpkg -->
<script src="https://unpkg.com/draggable-window/src/DraggableWindow.js"></script>

<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/draggable-window/src/DraggableWindow.js"></script>
```

## 💻 使用方式

### ES Modules (构建工具)
```javascript
import DraggableWindow from 'draggable-window';

const element = document.getElementById('myWindow');
new DraggableWindow(element);
```

### CommonJS (Node.js)
```javascript
const DraggableWindow = require('draggable-window');

const element = document.getElementById('myWindow');
new DraggableWindow(element);
```

### 浏览器直接使用
```html
<script src="https://unpkg.com/draggable-window/src/DraggableWindow.js"></script>
<script>
  new DraggableWindow(document.getElementById('myWindow'));
</script>
```

### 容器内拖拽
```javascript
const container = document.getElementById('container');
const windowElement = document.getElementById('myWindow');

new DraggableWindow(windowElement, {
  container: container,
  padding: 20 // 距离边界 20px
});
```

## 🚀 发布流程

### 发布前检查清单
1. ✅ 已在 GitHub 上创建仓库：https://github.com/aGG-Bond/draggableWindow
2. ⏳ 确认 npm 包名可用：`draggable-window`
3. ⏳ 已登录 npm 账号：`npm login`
4. ✅ package.json 元数据已完善
5. ✅ 本地代码已提交到 Git

### 发布步骤

#### 1. 本地测试
```bash
# 查看将要发布的文件列表
npm pack --dry-run

# 本地打包测试
npm pack
```

#### 2. 发布到 npm
```bash
# 发布正式版
npm publish

# 发布测试版（可选）
npm publish --tag beta
```

#### 3. 推送到 GitHub（如未推送）
```bash
git add .
git commit -m "feat: 添加 npm 包配置，支持直接下载安装"
git push origin main
```

## 📋 注意事项

1. **作者信息**：建议在 `package.json` 中填写作者信息
   ```json
   "author": "Your Name <your.email@example.com>"
   ```

2. **版本号管理**：遵循语义化版本规范（Semantic Versioning）
   - MAJOR.MINOR.PATCH（如：1.0.0）
   - 重大变更升级 MAJOR
   - 新功能升级 MINOR
   - Bug 修复升级 PATCH

3. **CDN 缓存**：unpkg 和 jsDelivr 会自动缓存新版本，通常几分钟内生效

4. **许可证**：已设置为 MIT License，确保有 LICENSE 文件

## 🔗 相关链接

- npm 包地址：https://www.npmjs.com/package/draggable-window
- GitHub 仓库：https://github.com/aGG-Bond/draggableWindow
- unpkg CDN: https://unpkg.com/draggable-window/
- jsDelivr CDN: https://www.jsdelivr.com/package/npm/draggable-window
