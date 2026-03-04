# DraggableWindow 可拖拽浮动窗口插件

## 简介

DraggableWindow 是一个轻量级的 JavaScript 插件，用于创建可拖拽的浮动窗口。该插件支持移动端触摸操作和 PC 端鼠标操作，具有智能的拖拽检测、边界约束和容器内拖拽功能。

## 功能特性

- ✅ **全平台兼容**：同时支持移动端触摸和 PC 端鼠标操作
- ✅ 支持触摸设备的拖拽操作
- ✅ 支持鼠标拖拽操作（PC 端）
- ✅ 自动边界检测，防止窗口移出屏幕
- ✅ 智能区分拖拽和点击操作
- ✅ 点击时可跳转到指定链接
- ✅ **支持容器内拖拽**：可限制在特定区域内移动
- ✅ **可配置边界内边距**：与容器边缘保持指定距离
- ✅ 轻量级，无依赖
- ✅ 易于集成和自定义

## 安装和引入

### NPM 安装（推荐）
```bash
npm install draggable-window
```

### CDN 引入
```html
<!-- unpkg -->
<script src="https://unpkg.com/draggable-window/src/DraggableWindow.js"></script>

<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/draggable-window/src/DraggableWindow.js"></script>
```

### 直接引入
```html
<script src="DraggableWindow.js"></script>
```

## 跨平台支持

### 移动端（触摸设备）
- 使用 `touchstart`、`touchmove`、`touchend` 事件
- 支持多点触控检测
- 优化的触摸体验

### PC端（鼠标设备）
- 使用 `mousedown`、`mousemove`、`mouseup` 事件
- 自动禁用文本选择防止干扰
- 平滑的鼠标拖拽体验

### 自动检测
插件会自动检测设备类型并使用相应的事件系统：
```javascript
// 内部检测逻辑
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
```

## 使用方式

#### 1. HTML 结构
```html
<!-- 基本用法 -->
<!-- data-url为点击跳转的链接 非必填 -->
<div id="myFloatWindow" data-url="https://www.example.com">
    点击我跳转
</div>

<!-- 或者动态创建 -->
<div class="float-window">无需点击跳转</div>
```

#### 2. JavaScript 初始化
```javascript
// 初始化单个窗口
const floatWindow = document.getElementById('myFloatWindow');
new DraggableWindow(floatWindow);

// 批量初始化多个窗口
document.querySelectorAll('.float-window').forEach(element => {
    new DraggableWindow(element);
});
```

#### 3. 高级用法 - 容器内拖拽
```javascript
// 限制在特定容器内拖拽
const container = document.getElementById('myContainer');
const floatWindow = document.getElementById('myFloatWindow');

new DraggableWindow(floatWindow, {
    container: container  // 指定容器
});

// 带边界内边距的配置
new DraggableWindow(floatWindow, {
    container: container,
    padding: 20  // 距离容器边界保持 20px 距离
});
```

## API 文档

### 构造函数
```javascript
new DraggableWindow(element, options = {})
```

**参数：** 
- `element` (HTMLElement): 要转换为可拖拽窗口的 DOM 元素 required
- `options` (Object): 配置选项对象（可选）
  - `container` (HTMLElement): 拖拽容器，限制窗口移动范围
  - `padding` (Number): 距离容器边界的内边距（像素），默认 0

### 配置选项

通过构造函数 options 参数进行配置：

| 选项 | 类型 | 默认值 | 描述 | 适用模式 |
|------|------|--------|------|----------|
| `container` | HTMLElement | document.body | 拖拽容器，限制窗口移动范围 | 容器模式 |
| `padding` | Number | 0 | 距离容器边界的内边距（像素） | 仅容器模式 |

通过元素的 `data-*` 属性进行配置：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `data-url` | String | '' | 点击时跳转的目标 URL/非必填 |

### 实例方法

该插件主要通过事件监听自动工作，无需手动调用方法。

## 使用示例

### 基础示例
```
<!DOCTYPE html>
<html>
<head>
    <title>基础示例</title>
</head>
<body>
    <div id="floatBtn" data-url="https://github.com">GitHub</div>
    
    <script src="DraggableWindow.js"></script>
    <script>
        // 初始化
        new DraggableWindow(document.getElementById('floatBtn'));
    </script>
</body>
</html>
```

### 容器内拖拽示例
```html
<div id="container" style="width: 400px; height: 400px; position: relative; border: 2px solid #ccc;">
    <div id="floatWindow" data-url="https://example.com" 
         style="width: 60px; height: 60px; background: #007bff; position: absolute;">
        拖动我
    </div>
</div>

<script src="DraggableWindow.js"></script>
<script>
    const container = document.getElementById('container');
    const floatWindow = document.getElementById('floatWindow');
    
    // 限制在容器内拖拽，距离边界 20px
    new DraggableWindow(floatWindow, {
        container: container,
        padding: 20
    });
</script>
```

### 动态创建示例
```
// 动态创建浮动按钮
function createFloatingButton(text, url, position = {top: '20px', right: '20px'}) {
    const btn = document.createElement('div');
    btn.textContent = text;
    btn.setAttribute('data-url', url);
    
    // 设置样式
    Object.assign(btn.style, {
        position: 'fixed',
        width: '60px',
        height: '60px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: '1000',
        top: position.top,
        right: position.right
    });
    
    document.body.appendChild(btn);
    new DraggableWindow(btn);
    
    return btn;
}

// 使用示例
createFloatingButton('帮助', 'https://help.example.com');
```

## 样式定制

### 推荐 CSS 样式
```
.float-window {
    position: fixed;
    width: 80px;
    height: 80px;
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: transform 0.2s ease;
}

.float-window:active {
    transform: scale(0.95);
}

/* 拖拽过程中临时禁用 transition */
.float-window.dragging {
    transition: none !important;
}
```

### 容器内拖拽的样式要求
```css
/* 容器必须设置相对定位 */
.drag-container {
    position: relative; /* 关键：作为子元素绝对定位的参照物 */
    overflow: hidden;   /* 可选：隐藏超出容器的内容 */
}

/* 容器内的浮动窗口使用绝对定位 */
.drag-container .float-window {
    position: absolute; /* 相对于容器定位，不随页面滚动移动 */
}
```

## 技术细节

### 拖拽检测机制
- 使用 10px 的拖动阈值来区分点击和拖拽操作
- 触摸开始时记录初始位置
- 移动过程中计算位移距离
- 超过阈值标记为拖拽状态

### 智能定位切换
```
// 根据是否指定容器决定定位方式
const isContainerSpecified = options.container && options.container !== document.body;
element.style.position = isContainerSpecified ? 'absolute' : 'fixed';
```

**定位策略说明：**
- **全局模式**（未指定 container）：使用 `position: fixed`，相对于视口定位
- **容器模式**（指定 container）：使用 `position: absolute`，相对于容器定位
  - 页面滚动时，元素保持在容器内的固定位置
  - 不会随页面滚动而移动

### 边界约束

#### 全局模式（默认）
- 自动检测视口尺寸
- 防止窗口移出屏幕边界
- 保持窗口完全可见
- 使用 `position: fixed` 定位

#### 容器模式
- 限制在指定容器内移动
- 支持可配置的边界内边距（padding）
- 四个方向统一应用 padding 值
- 使用 `position: absolute` 相对于容器定位
- 页面滚动时，元素保持在容器内的固定位置

### 定位策略
```javascript
// 根据是否指定容器决定定位方式
const isContainerSpecified = options.container && options.container !== document.body;
element.style.position = isContainerSpecified ? 'absolute' : 'fixed';
```

### 事件处理
- `touchstart` / `mousedown`: 开始拖拽检测
- `touchmove` / `mousemove`: 更新窗口位置
- `touchend` / `mouseup`: 结束拖拽并处理点击

## 浏览器兼容性

- ✅ Chrome (移动端/桌面端)
- ✅ Safari (移动端/桌面端)
- ✅ Firefox
- ✅ Edge
- ✅ Android Browser
- ✅ iOS Safari

## 注意事项

1. **引入文件**：确保正确引入 `DraggableWindow.js` 文件
2. 确保目标元素具有明确的定位属性 (`position: fixed` 或 `position: absolute`)
3. 建议设置合适的 `z-index` 值以确保窗口显示在其他内容之上
4. 移动端使用时建议添加 `user-select: none` 防止文本选择
5. 可以通过 CSS 自定义窗口的外观和动画效果
6. **容器内拖拽时**：
   - 容器必须设置 `position: relative`（或其他非 static 定位）
   - 子元素会自动使用 `position: absolute`
   - padding 配置仅在容器模式下生效
7. **推荐使用 demo.html 查看完整演示**
8. **推荐使用 demo1.html 查看区域拖拽演示**

## 许可证

MIT License

## 更新日志

详细的更新记录请查看 [CHANGELOG.md](CHANGELOG.md)。

### v1.0.0 (2026-03-04) - 正式发布 🎉

#### ✨ 核心功能
- ✅ 全平台拖拽支持（PC 端鼠标 + 移动端触摸）
- ✅ 智能拖拽检测（基于 10px 阈值区分点击和拖拽）
- ✅ 边界约束系统（全局模式 + 容器模式）
- ✅ 定位策略自动切换（fixed/absolute）
- ✅ 点击跳转功能（data-url 属性）

#### 📦 工程化特性
- ✅ 多格式打包输出（UMD/ESM/CommonJS）
- ✅ 生产环境压缩版仅 ~3KB
- ✅ TypeScript 类型定义支持
- ✅ NPM 包发布支持
- ✅ CDN 支持（unpkg/jsDelivr）

#### 📝 完整文档
- ✅ 详细使用文档和 API 说明
- ✅ 多个示例页面
- ✅ 快速开始指南
- ✅ 发布检查清单

#### 🔧 技术特点
- ✅ 零依赖，纯原生 JavaScript
- ✅ 轻量高效，核心代码 205 行
- ✅ 向后兼容 ES5+
- ✅ 支持现代主流浏览器

---

**版本**: v1.0.0  
**最后更新**: 2026-03-04  
**项目主页**: https://github.com/aGG-Bond/draggableWindow
