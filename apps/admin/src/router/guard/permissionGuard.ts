import type { Router } from 'vue-router';
import { PageEnum } from '../../enums/pageEnum';

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const whitePathList: string[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 白名单路由直接通过
    if (whitePathList.includes(to.path)) {
      next();
      return;
    }

    // 简化版本，暂时不做权限验证
    next();
  });
} 