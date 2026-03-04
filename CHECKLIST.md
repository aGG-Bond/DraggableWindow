# 📋 发布前检查清单

## ✅ 代码质量检查

- [ ] 所有 JavaScript 文件语法正确
- [ ] TypeScript 类型定义完整
- [ ] 无 console.log 等调试代码（生产环境）
- [ ] 代码已通过 ESLint/TSLint 检查（如配置）

## ✅ 文档完整性

- [ ] README.md 已更新
- [ ] package.json 信息完整
  - [ ] name: @aggbond/draggable-window
  - [ ] version: 1.0.0 (或最新版本号)
  - [ ] author: 已填写
  - [ ] license: MIT
  - [ ] keywords: 完整
  - [ ] repository: 正确的 GitHub 地址
  - [ ] bugs: issues 链接
  - [ ] homepage: 项目主页

## ✅ 构建配置

- [ ] rollup.config.js 配置正确
- [ ] .npmignore 已配置
- [ ] .gitignore 已配置
- [ ] package.json scripts 完整
  - [ ] build
  - [ ] build:watch
  - [ ] prepublishOnly

## ✅ 本地构建测试

```bash
# 1. 清理旧的构建产物
rm -rf dist/

# 2. 安装依赖
npm install

# 3. 执行构建
npm run build

# 4. 检查构建产物
ls -lh dist/

# 5. 预览发布内容
npm pack --dry-run

# 6. 本地打包测试
npm pack
```

## ✅ 构建产物验证

检查 `dist/` 目录是否包含以下文件：

- [ ] DraggableWindow.js (UMD, 未压缩)
- [ ] DraggableWindow.min.js (UMD, 压缩)
- [ ] DraggableWindow.esm.js (ES Module)
- [ ] DraggableWindow.common.js (CommonJS)
- [ ] DraggableWindow.d.ts (TypeScript 声明)

### 文件大小检查

每个文件应该在合理范围内：
- `DraggableWindow.min.js`: ~3-5 KB (压缩后)
- `DraggableWindow.js`: ~7-10 KB
- `DraggableWindow.esm.js`: ~7-10 KB
- `DraggableWindow.common.js`: ~7-10 KB

### Banner 检查

打开任意一个 dist 文件，确认包含正确的 banner：

```javascript
/**
 * @aggbond/draggable-window v1.0.0
 * [描述]
 * 
 * @author [作者信息]
 * @license MIT
 * @homepage https://github.com/aGG-Bond/draggableWindow#readme
 */
```

## ✅ 功能测试

### 浏览器测试

1. 打开 `demo/bundle-test.html`
2. 检查版本信息是否正确显示
3. 测试拖拽功能是否正常
4. 测试点击跳转功能
5. 检查控制台是否有错误

### 不同格式测试

- [ ] UMD 格式 (`DraggableWindow.min.js`) - 浏览器直接使用
- [ ] ES Module 格式 - 使用 `<script type="module">` 测试
- [ ] CommonJS 格式 - 在 Node.js 环境中测试

## ✅ Git 提交

```bash
# 1. 查看变更
git status

# 2. 添加文件
git add .

# 3. 提交（不要包含 dist/）
git commit -m "build: 添加 Rollup 打包配置，支持多格式输出"

# 4. 推送到远程
git push origin main
```

## ✅ npm 发布准备

### 前置条件

- [ ] 已在 GitHub 创建仓库
- [ ] 已登录 npm (`npm whoami`)
- [ ] npm 包名可用（未被占用）
- [ ] 已设置作者信息

### 发布命令

```bash
# 登录 npm
npm login

# 发布正式版
npm publish

# 或发布测试版
npm publish --tag beta

# 或发布特定版本
npm publish --tag latest
```

### 发布后验证

1. 访问 npm 页面：https://www.npmjs.com/package/@aggbond/draggable-window
2. 检查包信息是否完整
3. 测试 CDN 链接是否可用：
   - unpkg: https://unpkg.com/@aggbond/draggable-window/dist/DraggableWindow.min.js
   - jsDelivr: https://cdn.jsdelivr.net/npm/@aggbond/draggable-window/dist/DraggableWindow.min.js

## ✅ GitHub 发布

### 创建 Release

1. 访问 GitHub 仓库
2. 点击 "Releases" -> "Create a new release"
3. 填写信息：
   - Tag version: v1.0.0
   - Release title: v1.0.0
   - Description: 更新日志
4. 点击 "Publish release"

### 更新 CHANGELOG

在 README 或单独的 CHANGELOG.md 中记录更新内容。

## ⚠️ 常见问题

### 问题 1: 构建失败

**解决方案**:
```bash
# 清理 node_modules
rm -rf node_modules/
rm -rf package-lock.json

# 重新安装
npm install

# 重新构建
npm run build
```

### 问题 2: npm 发布失败 - 包名已存在

**解决方案**:
- 修改 package.json 中的 name 字段
- 或使用 scoped package: `@username/package-name`

### 问题 3: 文件大小异常

**解决方案**:
- 检查 rollup.config.js 中的 terser 配置
- 确认没有意外打包依赖
- 使用 `npm pack --dry-run` 预览

### 问题 4: CDN 无法访问

**解决方案**:
- 等待几分钟让 CDN 缓存生效
- 检查版本号是否正确
- 确认 unpkg/jsdelivr 链接格式正确

## 🎉 发布完成！

完成以上所有步骤后，你的包就已经成功发布到 npm 了！

用户可以通过以下方式安装和使用：

```bash
npm install @aggbond/draggable-window
```

```javascript
import DraggableWindow from '@aggbond/draggable-window';
```

---

**最后更新**: 2026-03-04
**版本**: v1.0.0
