<template>
  <a-layout class="layout-container">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="layout-sider"
      :width="220"
    >
      <!-- Logo -->
      <div class="logo">
        <img src="../../assets/images/logo.svg" alt="Logo" />
        <h1 v-if="!collapsed">企业管理系统</h1>
      </div>
      
      <!-- 菜单 -->
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-menu-item key="/dashboard">
          <template #icon>
            <dashboard-outlined />
          </template>
          <span>仪表盘</span>
        </a-menu-item>
        
        <a-sub-menu key="content">
          <template #icon>
            <file-outlined />
          </template>
          <template #title>内容管理</template>
          <a-menu-item key="/content/articles">文章管理</a-menu-item>
          <a-menu-item key="/content/categories">分类管理</a-menu-item>
          <a-menu-item key="/content/tags">标签管理</a-menu-item>
        </a-sub-menu>
        
        <a-sub-menu key="user">
          <template #icon>
            <user-outlined />
          </template>
          <template #title>用户管理</template>
          <a-menu-item key="/user/list">用户列表</a-menu-item>
          <a-menu-item key="/user/role">角色管理</a-menu-item>
          <a-menu-item key="/user/permission">权限管理</a-menu-item>
        </a-sub-menu>
        
        <a-menu-item key="/settings">
          <template #icon>
            <setting-outlined />
          </template>
          <span>系统设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    
    <!-- 内容区 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="layout-header">
        <div class="header-left">
          <!-- 折叠按钮 -->
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          
          <!-- 面包屑 -->
          <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>{{ currentRoute }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        
        <div class="header-right">
          <!-- 全屏按钮 -->
          <div class="header-item">
            <fullscreen-outlined class="icon" @click="toggleFullScreen" />
          </div>
          
          <!-- 通知 -->
          <div class="header-item">
            <a-badge :count="5">
              <bell-outlined class="icon" />
            </a-badge>
          </div>
          
          <!-- 国际化 -->
          <div class="header-item">
            <global-outlined class="icon" />
          </div>
          
          <!-- 用户信息 -->
          <a-dropdown>
            <div class="user-info">
              <a-avatar class="avatar">管</a-avatar>
              <span class="username">管理员</span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  <user-outlined />
                  个人中心
                </a-menu-item>
                <a-menu-item key="settings">
                  <setting-outlined />
                  账号设置
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout" @click="handleLogout">
                  <logout-outlined />
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      
      <!-- 标签页 -->
      <div class="layout-tabs">
        <a-tabs
          v-model:activeKey="activeTab"
          type="editable-card"
          :hide-add="true"
          @edit="onTabEdit"
        >
          <a-tab-pane key="/dashboard" tab="仪表盘" :closable="false" />
          <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title" />
        </a-tabs>
      </div>
      
      <!-- 内容 -->
      <a-layout-content class="layout-content">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>
      
      <!-- 页脚 -->
      <a-layout-footer class="layout-footer">
        企业管理系统 &copy; {{ new Date().getFullYear() }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  FileOutlined,
  BellOutlined,
  GlobalOutlined,
  FullscreenOutlined
} from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();

// 侧边栏折叠状态
const collapsed = ref(false);

// 菜单选中项
const selectedKeys = ref<string[]>(['/dashboard']);
const openKeys = ref<string[]>([]);

// 标签页
const activeTab = ref('/dashboard');
const tabs = ref<{ key: string; title: string }[]>([]);

// 当前路由名称
const currentRoute = computed(() => {
  const path = route.path;
  if (path === '/dashboard') return '仪表盘';
  if (path.startsWith('/content')) return '内容管理';
  if (path.startsWith('/user')) return '用户管理';
  if (path === '/settings') return '系统设置';
  return '页面';
});

// 监听路由变化
watch(
  () => route.path,
  (path) => {
    // 更新选中的菜单
    selectedKeys.value = [path];
    
    // 更新打开的子菜单
    if (path.startsWith('/content')) {
      openKeys.value = ['content'];
    } else if (path.startsWith('/user')) {
      openKeys.value = ['user'];
    }
    
    // 更新标签页
    activeTab.value = path;
    
    // 如果标签页不存在，则添加
    if (path !== '/dashboard' && !tabs.value.some(tab => tab.key === path)) {
      tabs.value.push({
        key: path,
        title: currentRoute.value
      });
    }
  },
  { immediate: true }
);

// 标签页编辑
function onTabEdit(targetKey: string, action: 'add' | 'remove') {
  if (action === 'remove') {
    tabs.value = tabs.value.filter(tab => tab.key !== targetKey);
    
    // 如果关闭的是当前标签，则跳转到最后一个标签
    if (targetKey === activeTab.value) {
      const lastTab = tabs.value[tabs.value.length - 1];
      if (lastTab) {
        router.push(lastTab.key);
      } else {
        router.push('/dashboard');
      }
    }
  }
}

// 切换全屏
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// 退出登录
function handleLogout() {
  router.push('/login');
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
}

.layout-sider {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  position: relative;
  z-index: 10;
  
  .logo {
    height: 64px;
    padding: 16px;
    display: flex;
    align-items: center;
    background: #001529;
    overflow: hidden;
    
    img {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
    }
    
    h1 {
      margin: 0 0 0 12px;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.layout-header {
  background: #fff;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 48px;
  line-height: 48px;
  
  .header-left {
    display: flex;
    align-items: center;
    
    .trigger {
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;
      
      &:hover {
        color: #1890ff;
      }
    }
    
    .breadcrumb {
      margin-left: 16px;
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    
    .header-item {
      padding: 0 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      
      .icon {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        
        &:hover {
          color: #1890ff;
        }
      }
    }
    
    .user-info {
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
      
      .avatar {
        background-color: #1890ff;
      }
      
      .username {
        margin-left: 8px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}

.layout-tabs {
  padding: 6px 16px 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.layout-content {
  margin: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: auto;
}

.layout-footer {
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  padding: 14px 16px;
  height: auto;
}

// 过渡动画
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 