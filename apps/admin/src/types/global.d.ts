declare global {
  // 通用类型
  type Recordable<T = any> = Record<string, T>;
  type Nullable<T> = T | null;
  
  // 通用接口
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_USE_CDN: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_USE_IMAGEMIN: boolean;
    VITE_GENERATE_UI: string;
    VITE_LEGACY: boolean;
    VITE_USE_PWA: boolean;
    VITE_API_URL: string;
  }

  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {}; 