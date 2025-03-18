// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
   devServer: {
    port: 9102
   },
  // 应用元数据
  app: {
    head: {
      title: '企业官网',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '企业官方网站，展示公司产品、服务和解决方案' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // 模块配置
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  
  // CSS配置
  css: [
    '~/assets/css/main.css'
  ],
  
  // 运行时配置
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8080/api'
    }
  }
})
