import type { RouteRecordRaw } from 'vue-router';
import { LAYOUT, EXCEPTION_COMPONENT } from '../constant';
import { PageEnum } from '../../enums/pageEnum';

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

// 重定向路由
export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: 'Redirect',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('../../views/sys/redirect/index.vue'),
      meta: {
        title: 'Redirect',
        hideBreadcrumb: true,
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
    title: '404',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: '404',
        hideBreadcrumb: true,
        hideMenu: true,
        status: 404,
      },
    },
  ],
}; 