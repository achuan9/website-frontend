import { i18n } from '../../locales/setupI18n';

type I18nGlobalTranslation = {
  (key: string): string;
  (key: string, locale: string): string;
  (key: string, locale: string, list: unknown[]): string;
  (key: string, locale: string, named: Record<string, unknown>): string;
  (key: string, list: unknown[]): string;
  (key: string, named: Record<string, unknown>): string;
};

type I18nTranslationRestParameters = [string, any];

function getKey(namespace: string | undefined, key: string) {
  if (!namespace) {
    return key;
  }
  if (key.startsWith(namespace)) {
    return key;
  }
  return `${namespace}.${key}`;
}

export function useI18n(namespace?: string): {
  t: I18nGlobalTranslation;
} {
  const normalFn = {
    t: (key: string, ...arg: any[]) => {
      if (!key) return '';
      if (!i18n) return key;
      return i18n.global.t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters));
    },
  };

  return normalFn;
}

// 不需要命名空间的情况下使用
export const t = (key: string, ...arg: any[]): string => {
  if (!key) return '';
  if (!i18n) return key;
  return i18n.global.t(key, ...(arg as I18nTranslationRestParameters));
};