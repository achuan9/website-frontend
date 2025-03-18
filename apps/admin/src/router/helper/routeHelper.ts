import type { AppRouteRecordRaw } from 'vben-admin-thin-next/es/router/types';
import { LAYOUT } from '../constant';

/**
 * 将后端返回的菜单数据转换为路由对象
 */
export function transformObjToRoute(routeList: any[]): AppRouteRecordRaw[] {
  if (!routeList) return [];
  
  return routeList.map((item) => {
    const { component, children, meta, ...rest } = item;
    
    // 处理组件
    let currentComponent: any = null;
    if (component) {
      if (component === 'LAYOUT') {
        currentComponent = LAYOUT;
      } else {
        // 动态导入组件
        currentComponent = () => import(`../../views/${component}.vue`);
      }
    }
    
    // 递归处理子路由
    const childrenRoutes = transformObjToRoute(children || []);
    
    return {
      ...rest,
      component: currentComponent,
      meta: meta || {},
      children: childrenRoutes,
    } as unknown as AppRouteRecordRaw;
  });
} 