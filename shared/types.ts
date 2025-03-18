// 通用响应类型
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// 分页请求参数
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'ascend' | 'descend';
}

// 分页响应数据
export interface PaginationResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 用户信息
export interface UserInfo {
  id: string;
  username: string;
  realName: string;
  avatar: string;
  email: string;
  roles: string[];
  permissions: string[];
}

// 登录参数接口
export interface LoginParams {
  username: string;
  password: string;
}

// 响应结果接口
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

// 分页参数接口
export interface PageParams {
  page: number;
  pageSize: number;
  [key: string]: any;
}

// 分页结果接口
export interface PageResult<T = any> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 菜单项接口
export interface MenuItem {
  id: string;
  name: string;
  path: string;
  component?: string;
  redirect?: string;
  meta: {
    title: string;
    icon?: string;
    orderNo?: number;
    hideMenu?: boolean;
    hideBreadcrumb?: boolean;
    ignoreAuth?: boolean;
    [key: string]: any;
  };
  children?: MenuItem[];
}

// 文章接口
export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  cover: string;
  category: string;
  tags: string[];
  author: string;
  publishTime: string;
  viewCount: number;
  status: number;
}

// 产品接口
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  features: string[];
  createTime: string;
  updateTime: string;
  status: number;
} 