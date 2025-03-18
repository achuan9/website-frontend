import { createApp } from 'vue';
import App from './App.vue';

// 引入路由和状态管理
import { router, setupRouter } from './router';
import { setupRouterGuard } from './router/guard';
import { setupStore } from './store';
import { setupI18n } from './locales/setupI18n';
import { registerGlobComp } from './components/registerGlobComp';

// 引入样式
import './styles/index.scss';

// 引入图标
import 'virtual:svg-icons-register';

// 引入UnoCSS
import 'uno.css';

async function bootstrap() {
  const app = createApp(App);

  // 配置store
  setupStore(app);

  // 注册全局组件
  registerGlobComp(app);

  // 多语言配置
  await setupI18n(app);

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  app.mount('#app');
}

bootstrap(); 