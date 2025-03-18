/**
 * 格式化日期
 * @param date 日期对象或日期字符串
 * @param format 格式化模板，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('HH', hour.toString().padStart(2, '0'))
    .replace('mm', minute.toString().padStart(2, '0'))
    .replace('ss', second.toString().padStart(2, '0'));
}

/**
 * 本地存储封装
 */
export const storage = {
  /**
   * 设置本地存储
   * @param key 键名
   * @param value 值
   * @param expire 过期时间(毫秒)，可选
   */
  set(key: string, value: any, expire?: number): void {
    const data = {
      value,
      time: Date.now(),
      expire: expire ? Date.now() + expire : null
    };
    localStorage.setItem(key, JSON.stringify(data));
  },
  
  /**
   * 获取本地存储
   * @param key 键名
   * @param defaultValue 默认值，可选
   * @returns 存储的值或默认值
   */
  get(key: string, defaultValue: any = null): any {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    try {
      const data = JSON.parse(item);
      if (data.expire && Date.now() > data.expire) {
        localStorage.removeItem(key);
        return defaultValue;
      }
      return data.value;
    } catch {
      return defaultValue;
    }
  },
  
  /**
   * 移除本地存储
   * @param key 键名
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  },
  
  /**
   * 清空本地存储
   */
  clear(): void {
    localStorage.clear();
  }
};

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 拷贝后的新对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as any;
  }
  
  if (obj instanceof Object) {
    const copy = {} as Record<string, any>;
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as Record<string, any>)[key]);
    });
    return copy as T;
  }
  
  return obj;
}

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟时间，单位毫秒
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    if (timer) {
      clearTimeout(timer);
    }
    
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param delay 延迟时间，单位毫秒
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, delay = 300): (...args: Parameters<T>) => void {
  let lastTime = 0;
  
  return function(this: any, ...args: Parameters<T>): void {
    const now = Date.now();
    
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

/**
 * 生成UUID
 * @returns UUID字符串
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 获取URL参数
 * @param url URL字符串
 * @returns 参数对象
 */
export function getUrlParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const queryString = url.split('?')[1];
  
  if (!queryString) {
    return params;
  }
  
  queryString.split('&').forEach(param => {
    const [key, value] = param.split('=');
    params[key] = decodeURIComponent(value || '');
  });
  
  return params;
} 