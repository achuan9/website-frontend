import { defineStore } from 'pinia';
import { store } from '..';
import { router } from '../../router';
import { PageEnum } from '../../enums/pageEnum';

// 用户信息接口
interface UserInfo {
  id: string;
  username: string;
  realName: string;
  avatar: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface UserState {
  userInfo: UserInfo | null;
  token?: string;
  roleList: string[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // 用户信息
    userInfo: null,
    // token
    token: undefined,
    // 角色列表
    roleList: [],
    // session过期时间
    sessionTimeout: false,
    // 最后更新时间
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || { id: '', username: '', realName: '', avatar: '', email: '', roles: [], permissions: [] };
    },
    getToken(): string {
      return this.token || '';
    },
    getRoleList(): string[] {
      return this.roleList;
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token;
    },
    setRoleList(roleList: string[]) {
      this.roleList = roleList;
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: 登录
     */
    async login(params: { username: string; password: string }) {
      try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟返回数据
        const token = 'fake_token_' + new Date().getTime();
        const user: UserInfo = {
          id: '1',
          username: params.username,
          realName: '管理员',
          avatar: '',
          email: 'admin@example.com',
          roles: ['admin'],
          permissions: ['*'],
        };
        
        // 保存token
        this.setToken(token);
        // 保存用户信息
        this.setUserInfo(user);
        // 保存角色
        this.setRoleList(user.roles);
        // 跳转到首页
        await router.replace(PageEnum.BASE_HOME);
        return { token, user };
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: 登出
     */
    async logout() {
      this.resetState();
      router.push(PageEnum.BASE_LOGIN);
    },
  },
  persist: {
    paths: ['token', 'userInfo'],
  },
});

// 在组件外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
} 