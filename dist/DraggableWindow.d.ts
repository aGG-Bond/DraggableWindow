// Type definitions for draggable-window
// Definitions by: DraggableWindow Team

export interface DraggableWindowOptions {
  /**
   * 拖拽容器，限制窗口移动范围
   */
  container?: HTMLElement;
  
  /**
   * 距离容器边界的内边距（像素）
   * @default 0
   */
  padding?: number;
}

export declare class DraggableWindow {
  /**
   * 创建可拖拽浮动窗口实例
   * @param element 要转换为可拖拽窗口的 DOM 元素
   * @param options 配置选项
   */
  constructor(element: HTMLElement, options?: DraggableWindowOptions);
  
  /**
   * 销毁实例
   */
  destroy(): void;
}

export default DraggableWindow;