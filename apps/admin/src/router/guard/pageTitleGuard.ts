import type { Router } from 'vue-router';

export function createPageTitleGuard(router: Router) {
  router.afterEach((to) => {
    // 设置页面标题
    const title = to.meta?.title ? `${to.meta.title} - 企业官网管理系统` : '企业官网管理系统';
    document.title = title;
  });
} 