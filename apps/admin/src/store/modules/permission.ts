import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { store } from '..';
import { useUserStore } from './user';
import { PAGE_NOT_FOUND_ROUTE } from '../../router/routes/index';
import { DashboardRoute } from '../../router/routes/index';

// 菜单项接口
interface MenuItem extends RouteRecordRaw {
  meta?: {
    title?: string;
    icon?: string;
    hideMenu?: boolean;
    hideBreadcrumb?: boolean;
    currentActiveMenu?: string;
    [key: string]: any;
  };
  children?: MenuItem[];
}

interface PermissionState {
  // 权限代码列表
  permCodeList: string[];
  // 是否已经动态添加路由
  isDynamicAddedRoute: boolean;
  // 最后更新时间
  lastBuildTime: number;
  // 后台菜单列表
  backMenuList: MenuItem[];
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildTime: 0,
    backMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] {
      return this.permCodeList;
    },
    getBackMenuList(): MenuItem[] {
      return this.backMenuList;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getLastBuildTime(): number {
      return this.lastBuildTime;
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },
    setBackMenuList(list: MenuItem[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildTime();
    },
    setLastBuildTime() {
      this.lastBuildTime = new Date().getTime();
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState() {
      this.permCodeList = [];
      this.backMenuList = [];
      this.isDynamicAddedRoute = false;
      this.lastBuildTime = 0;
    },
    async buildRoutesAction(): Promise<MenuItem[]> {
      const userStore = useUserStore();
      const roleList = userStore.getRoleList;

      let routes: MenuItem[] = [];
      try {
        // 模拟从后端获取路由
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟权限列表
        const permissions = ['dashboard:view', 'content:view', 'user:view', 'setting:view'];
        
        // 设置权限列表
        this.setPermCodeList(permissions);
        
        // 模拟菜单列表
        routes = [DashboardRoute] as MenuItem[];
        
        // 保存菜单列表
        this.setBackMenuList(routes);
        
        return routes;
      } catch (error) {
        console.error('获取菜单失败', error);
        return [];
      }
    },
  },
});

// 在组件外使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
} 