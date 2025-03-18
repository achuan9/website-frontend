import type { RouteRecordRaw } from 'vue-router';
import { PageEnum } from '../../enums/pageEnum';

import { LAYOUT } from '../constant';

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

// 登录路由
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('../../views/sys/login/Login.vue'),
  meta: {
    title: '登录',
  },
};

// 仪表盘路由
export const DashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/index',
  meta: {
    title: '仪表盘',
  },
  children: [
    {
      path: 'index',
      name: 'DashboardIndex',
      component: () => import('../../views/dashboard/index.vue'),
      meta: {
        title: '仪表盘',
        affix: true,
      },
    },
  ],
};

// 用户管理路由
export const UserRoute: RouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/list',
  meta: {
    title: '用户管理',
    icon: 'user-outlined',
  },
  children: [
    {
      path: 'list',
      name: 'UserList',
      component: () => import('../../views/user/list/index.vue'),
      meta: {
        title: '用户列表',
      },
    },
    {
      path: 'role',
      name: 'UserRole',
      component: () => import('../../views/user/role/index.vue'),
      meta: {
        title: '角色管理',
      },
    },
    {
      path: 'permission',
      name: 'UserPermission',
      component: () => import('../../views/user/permission/index.vue'),
      meta: {
        title: '权限管理',
      },
    },
  ],
};

// 内容管理路由
export const ContentRoute: RouteRecordRaw = {
  path: '/content',
  name: 'Content',
  component: LAYOUT,
  redirect: '/content/articles',
  meta: {
    title: '内容管理',
    icon: 'file-outlined',
  },
  children: [
    {
      path: 'articles',
      name: 'ContentArticles',
      component: () => import('../../views/content/articles/index.vue'),
      meta: {
        title: '文章管理',
      },
    },
    {
      path: 'categories',
      name: 'ContentCategories',
      component: () => import('../../views/content/categories/index.vue'),
      meta: {
        title: '分类管理',
      },
    },
    {
      path: 'tags',
      name: 'ContentTags',
      component: () => import('../../views/content/tags/index.vue'),
      meta: {
        title: '标签管理',
      },
    },
  ],
};

// 系统设置路由
export const SettingsRoute: RouteRecordRaw = {
  path: '/settings',
  name: 'Settings',
  component: LAYOUT,
  redirect: '/settings/index',
  meta: {
    title: '系统设置',
    icon: 'setting-outlined',
  },
  children: [
    {
      path: 'index',
      name: 'SettingsIndex',
      component: () => import('../../views/settings/index.vue'),
      meta: {
        title: '系统设置',
      },
    },
  ],
};

// 404路由
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: LAYOUT,
  meta: {
    title: '错误页面',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFoundChild',
      component: () => import('../../views/sys/exception/Exception.vue'),
      meta: {
        title: '错误页面',
        hideBreadcrumb: true,
        hideMenu: true,
        currentActiveMenu: PageEnum.BASE_HOME,
        status: 404,
      },
    },
  ],
};

// 基本路由 (不需要权限)
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  DashboardRoute,
  UserRoute,
  ContentRoute,
  SettingsRoute,
  PAGE_NOT_FOUND_ROUTE,
]; 