import type { Router } from 'vue-router';

export function createPageLoadingGuard(router: Router) {
  router.beforeEach(() => {
    // 这里可以添加页面加载状态的逻辑
    return true;
  });

  router.afterEach(() => {
    // 这里可以添加页面加载完成的逻辑
  });
} 