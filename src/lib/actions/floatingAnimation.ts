import type { Action } from 'svelte/action';

interface FloatingAnimationOptions {
  // 是否启用随机初始位置
  randomPosition?: boolean;
  // 初始位置（如果不随机）
  initialX?: number;
  initialY?: number;
  // 速度相关配置
  baseSpeed?: number;
  accelerationFactor?: number;
  accelerationDuration?: number;
  accelerationDistance?: number;
  // 容器相关
  containerSelector?: string; // 如果不是直接父元素，可以指定容器选择器
}

/**
 * 浮动动画action - 添加物理动画效果到任何元素
 * 
 * 元素会随机移动，鼠标靠近时加速，碰到容器边界时弹开
 */
export const floatingAnimation: Action<HTMLElement, FloatingAnimationOptions> = (
  node, 
  options = {}
) => {
  // 默认配置
  const config = {
    randomPosition: true,
    initialX: 0,
    initialY: 0,
    baseSpeed: 0.01,
    accelerationFactor: 3,
    accelerationDuration: 2000,
    accelerationDistance: 150,
    containerSelector: '',
    ...options
  };

  // 状态变量
  let position = {
    x: config.randomPosition ? Math.random() * 80 : config.initialX,
    y: config.randomPosition ? Math.random() * 80 : config.initialY
  };
  
  let velocity = {
    x: (Math.random() * 2 - 1) * 0.05,
    y: (Math.random() * 2 - 1) * 0.05
  };
  
  let currentSpeed = config.baseSpeed;
  let accelerated = false;
  let accelerationTimer: number | null = null;
  let animationFrameId: number;
  let containerWidth = 0;
  let containerHeight = 0;
  let nodeWidth = 0;
  let nodeHeight = 0;
  let mousePosition = { x: 0, y: 0 };

  // 获取容器元素
  function getContainer(): HTMLElement {
    if (config.containerSelector) {
      return document.querySelector(config.containerSelector) as HTMLElement || node.parentElement!;
    }
    return node.parentElement!;
  }

  // 鼠标移动处理
  function handleMouseMove(event: MouseEvent) {
    const container = getContainer();
    if (!container) return;

    const rect = container.getBoundingClientRect();
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;

    // 检查鼠标是否靠近元素
    const nodeRect = node.getBoundingClientRect();
    const nodeCenterX = nodeRect.left + nodeRect.width / 2 - rect.left;
    const nodeCenterY = nodeRect.top + nodeRect.height / 2 - rect.top;

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - nodeCenterX, 2) +
      Math.pow(mousePosition.y - nodeCenterY, 2)
    );

    // 如果鼠标在指定距离内且未加速
    if (distance < config.accelerationDistance && !accelerated) {
      accelerated = true;
      currentSpeed = config.baseSpeed * config.accelerationFactor;

      // 重置加速计时器
      if (accelerationTimer) {
        clearTimeout(accelerationTimer);
      }

      accelerationTimer = window.setTimeout(() => {
        currentSpeed = config.baseSpeed;
        accelerated = false;
        accelerationTimer = null;
      }, config.accelerationDuration);
    }
  }

  // 更新元素位置
  function updatePosition() {
    const container = getContainer();
    if (!container) return;

    // 获取容器和元素尺寸
    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    containerWidth = containerRect.width;
    containerHeight = containerRect.height;
    nodeWidth = nodeRect.width;
    nodeHeight = nodeRect.height;

    // 根据速度更新位置
    position.x += velocity.x * currentSpeed * containerWidth;
    position.y += velocity.y * currentSpeed * containerHeight;

    // 计算边界（百分比）
    const maxX = 100 - (nodeWidth / containerWidth) * 100;
    const maxY = 100 - (nodeHeight / containerHeight) * 100;

    // 碰撞边界反弹
    if (position.x <= 0) {
      position.x = 0;
      velocity.x = -velocity.x;
    } else if (position.x >= maxX) {
      position.x = maxX;
      velocity.x = -velocity.x;
    }

    if (position.y <= 0) {
      position.y = 0;
      velocity.y = -velocity.y;
    } else if (position.y >= maxY) {
      position.y = maxY;
      velocity.y = -velocity.y;
    }

    // 应用新位置
    node.style.position = 'absolute';
    node.style.left = `${position.x}%`;
    node.style.top = `${position.y}%`;

    // 继续动画循环
    animationFrameId = requestAnimationFrame(updatePosition);
  }

  // 初始化
  function initialize() {
    // 设置初始样式
    node.style.position = 'absolute';
    node.style.left = `${position.x}%`;
    node.style.top = `${position.y}%`;

    // 添加事件监听
    window.addEventListener('mousemove', handleMouseMove);

    // 开始动画循环
    animationFrameId = requestAnimationFrame(updatePosition);
  }

  // 只在浏览器环境中运行
  if (typeof window !== 'undefined') {
    initialize();
  }

  // 清理函数
  return {
    destroy() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (accelerationTimer) {
          clearTimeout(accelerationTimer);
        }
      }
    },
    update(newOptions: FloatingAnimationOptions) {
      // 更新配置
      Object.assign(config, newOptions);
    }
  };
};
