# 🚀 快速开始指南

## 1. 安装依赖

```bash
npm install
```

这将安装以下开发依赖：
- Rollup - 模块打包工具
- @rollup/plugin-node-resolve - Node.js 模块解析
- @rollup/plugin-commonjs - CommonJS 模块转换
- @rollup/plugin-terser - 代码压缩
- @rollup/plugin-replace - 代码替换
- TypeScript - 类型检查（可选）

## 2. 构建项目

```bash
# 构建所有格式
npm run build

# 监听模式（开发用）
npm run build:watch
```

## 3. 测试构建结果

打开 `demo/bundle-test.html` 查看效果：

```bash
# 使用任意静态服务器
npx serve .

# 或使用 Live Server 插件
```

然后在浏览器中访问：`http://localhost:3000/demo/bundle-test.html`

## 4. 发布到 npm

在发布前，请确保：

1. ✅ 已更新 `package.json` 中的作者信息
2. ✅ 已更新版本号
3. ✅ 已完成本地构建 (`npm run build`)
4. ✅ 已登录 npm (`npm login`)

```bash
# 预览将要发布的文件
npm pack --dry-run

# 发布
npm publish
```

## 📝 注意事项

### Windows 系统

在 Windows 系统中执行命令时，请使用 PowerShell 或 Git Bash：

```powershell
# PowerShell
npm run build

# 或者分开执行
npm install
npm run build
```

### 自定义作者信息

在 `package.json` 中修改：

```json
{
  "author": "Your Name <your.email@example.com> (https://yourwebsite.com)"
}
```

### 版本号管理

```bash
# 补丁版本（Bug 修复）
npm version patch

# 次级版本（新功能）
npm version minor

# 主要版本（重大变更）
npm version major
```

## 🎯 下一步

- 查看 `BUNDLING_GUIDE.md` 了解详细的打包配置
- 查看 `demo/` 目录中的示例代码
- 开始使用 DraggableWindow 创建你的拖拽窗口！
