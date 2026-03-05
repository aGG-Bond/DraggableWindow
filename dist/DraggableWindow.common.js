/**
 * @aggbond/draggable-window v1.0.1
 * 一个轻量级的 JavaScript 可拖拽浮动窗口插件，支持移动端触摸和 PC 端鼠标操作，具有容器内拖拽和边界约束功能
 * 
 * (c) 2026 aGG-Bond
 * @license MIT
 * @GitHub https://github.com/aGG-Bond/draggableWindow#readme
 * 
 */
'use strict';

class DraggableWindow {
  constructor(element, options = {}) {
    if (!element) {
      throw new Error("element is required!!");
    }
    this.element = element;
    this.container = options.container || document.body; // 支持指定容器
    // 根据是否指定容器决定定位方式
    const isContainerSpecified = options.container && options.container !== document.body;
    this.element.style.position = isContainerSpecified ? 'absolute' : 'fixed';
    this.targetUrl = this.element.dataset.url; // 从 data-url 属性获取目标链接
    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;
    this.isDragging = false; // 用于跟踪是否正在拖动
    this.dragThreshold = 10; // 拖动阈值（像素）
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // 边界 padding 配置（仅容器模式有效）
    this.boundaryPadding = options.padding || 0;

    this.init();
  }

  init() {
    if (this.isTouchDevice) {
      // 移动端事件监听
      this.element.addEventListener("touchstart", (e) => this.dragMouseDown(e), {
        passive: false,
      });
    } else {
      // PC端事件监听
      this.element.addEventListener("mousedown", (e) => this.dragMouseDown(e));
    }
    
    // 添加点击事件监听，以便跳转到目标URL
    this.element.addEventListener("click", (e) => this.handleClick(e));
  }

  dragMouseDown(e) {
    e.preventDefault();

    // 获取起始位置（兼容触摸和鼠标事件）
    if (this.isTouchDevice) {
      this.pos3 = e.touches[0].clientX;
      this.pos4 = e.touches[0].clientY;
    } else {
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
    }

    this.isDragging = false; // 开始时设置为不拖动
    
    // 添加 dragging 类以禁用 transition
    this.element.style.setProperty('transition', 'none');

    this.boundElementDrag = (e) => this.elementDrag(e);
    this.boundCloseDragElement = () => this.closeDragElement();
    
    if (this.isTouchDevice) {
      // 移动端事件监听
      document.addEventListener("touchmove", this.boundElementDrag, {
        passive: false,
      });
      document.addEventListener("touchend", this.boundCloseDragElement);
    } else {
      // PC端事件监听
      document.addEventListener("mousemove", this.boundElementDrag);
      document.addEventListener("mouseup", this.boundCloseDragElement);
      
      // 防止文本选择
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }
  }

  elementDrag(e) {
    e.preventDefault();

    // 获取当前位置（兼容触摸和鼠标事件）
    let clientX, clientY;
    if (this.isTouchDevice) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // 计算新的位置
    const newPos1 = this.pos3 - clientX;
    const newPos2 = this.pos4 - clientY;

    // 记录新的位置
    this.pos3 = clientX;
    this.pos4 = clientY;

    // 检测是否超出拖动阈值
    if (
      Math.abs(newPos1) > this.dragThreshold ||
      Math.abs(newPos2) > this.dragThreshold
    ) {
      this.isDragging = true; // 如果超出阈值则标识为拖动
    }

    // 更新浮窗的位置
    let newTop = this.element.offsetTop - newPos2;
    let newLeft = this.element.offsetLeft - newPos1;

    // 获取容器的边界信息
    const isContainerSpecified = this.container !== document.body;
    const containerRect = isContainerSpecified 
      ? this.container.getBoundingClientRect()
      : { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };

    // 获取浮窗的尺寸
    const floatWidth = this.element.offsetWidth;
    const floatHeight = this.element.offsetHeight;

    // 边界检测 - 限制在容器范围内
    if (isContainerSpecified) {
      // 容器内拖拽：使用相对于容器的坐标，并应用 padding
      const padding = this.boundaryPadding;
      
      if (newTop < padding) {
        newTop = padding; // 不允许超出容器顶部（含 padding）
      }
      if (newLeft < padding) {
        newLeft = padding; // 不允许超出容器左边（含 padding）
      }
      if (newTop + floatHeight > containerRect.height - padding) {
        newTop = containerRect.height - floatHeight - padding; // 不允许超出容器底部（含 padding）
      }
      if (newLeft + floatWidth > containerRect.width - padding) {
        newLeft = containerRect.width - floatWidth - padding; // 不允许超出容器右边（含 padding）
      }
    } else {
      // 全局拖拽：使用相对于视口的坐标
      if (newTop < containerRect.top) {
        newTop = containerRect.top; // 不允许超出容器顶部
      }
      if (newLeft < containerRect.left) {
        newLeft = containerRect.left; // 不允许超出容器左边
      }
      if (newTop + floatHeight > containerRect.top + containerRect.height) {
        newTop = containerRect.top + containerRect.height - floatHeight; // 不允许超出容器底部
      }
      if (newLeft + floatWidth > containerRect.left + containerRect.width) {
        newLeft = containerRect.left + containerRect.width - floatWidth; // 不允许超出容器右边
      }
    }

    // 更新浮窗的位置
    this.element.style.top = newTop + "px";
    this.element.style.left = newLeft + "px";
  }

  closeDragElement() {
    // 移除事件监听
    if (this.isTouchDevice) {
      document.removeEventListener("touchmove", this.boundElementDrag);
      document.removeEventListener("touchend", this.boundCloseDragElement);
    } else {
      document.removeEventListener("mousemove", this.boundElementDrag);
      document.removeEventListener("mouseup", this.boundCloseDragElement);
      
      // 恢复文本选择
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    }
    
    // 移除 dragging 类，恢复 transition 效果
    setTimeout(() => {
      this.element.style.removeProperty('transition');
    }, 100);

    // 处理点击事件
    if (!this.isDragging) {
      // 如果没有拖动，则设置点击计时器
      this.clickTimer = setTimeout(() => {
        this.handleClick();
      }, 0); // 设置为 0，让浏览器在处理完所有事件后再执行
    } else {
      // 清除之前的点击计时器
      clearTimeout(this.clickTimer);
    }
  }

  handleClick(e) {
    // 如果正在拖动，则阻止跳转
    if (this.isDragging) {
      e.preventDefault(); // 阻止默认的链接跳转
      if (e) {
        e.stopPropagation(); // 阻止事件冒泡
      }
    } else {
      // 否则正常跳转
      if (this.targetUrl && this.targetUrl !== '#') {
        window.location.href = this.targetUrl; // 点击后跳转链接
      }
    }
  }
}

module.exports = DraggableWindow;
//# sourceMappingURL=DraggableWindow.common.js.map
