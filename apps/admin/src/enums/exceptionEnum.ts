/**
 * @description: 异常枚举
 */
export enum ExceptionEnum {
  // 页面未找到
  PAGE_NOT_FOUND = 404,

  // 没有权限
  FORBIDDEN = 403,

  // 服务器错误
  SERVER_ERROR = 500,

  // 网络错误
  NET_WORK_ERROR = 10000,

  // 未知错误
  UNKNOWN_ERROR = 10001,
} 