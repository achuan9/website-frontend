import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import UnoCSS from 'unocss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'types/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store'],
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    }),
    UnoCSS(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: '企业官网管理系统'
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'types'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // scss配置
      },
    },
  },
  server: {
    port: 9101,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          antd: ['ant-design-vue', '@ant-design/icons-vue'],
        },
      },
    },
  },
}); 