import type { Router } from 'vue-router';
import { createPermissionGuard } from './permissionGuard';
import { createPageLoadingGuard } from './pageLoadingGuard';
import { createPageTitleGuard } from './pageTitleGuard';
import { createProgressGuard } from './progressGuard';

export function setupRouterGuard(router: Router) {
  createPageLoadingGuard(router);
  createPermissionGuard(router);
  createPageTitleGuard(router);
  createProgressGuard(router);
} 