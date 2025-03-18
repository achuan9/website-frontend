import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

// 语言设置
const localeSetting = {
  locale: 'zh-CN',
  fallback: 'zh-CN',
  availableLocales: ['zh-CN', 'en-US'],
};

const { fallback, availableLocales } = localeSetting;

export let i18n: ReturnType<typeof createI18n>;

export async function setupI18n(app: App) {
  i18n = createI18n({
    locale: localeSetting.locale,
    fallbackLocale: fallback,
    messages: {
      'zh-CN': {
        common: {
          welcome: '欢迎使用企业官网管理系统'
        }
      },
      'en-US': {
        common: {
          welcome: 'Welcome to Company Website Admin'
        }
      }
    },
    legacy: false,
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  });
  
  app.use(i18n);
} 