import type { AppRouteRecordRaw } from 'vben-admin-thin-next/es/router/types';
import { LAYOUT } from '../../constant';

const dashboard: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '仪表盘',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('../../../views/dashboard/index.vue'),
      meta: {
        title: '分析页',
      },
    },
  ],
};

export default dashboard; 