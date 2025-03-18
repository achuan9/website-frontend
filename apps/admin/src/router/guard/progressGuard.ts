import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置NProgress
NProgress.configure({ showSpinner: false });

export function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    NProgress.start();
    return true;
  });

  router.afterEach(() => {
    NProgress.done();
  });
} 