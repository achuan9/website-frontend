# 企业官网项目

这是一个使用pnpm工作区管理的企业官网项目，包括官网前台和管理后台两个应用。

## 项目升级说明 (2025年3月17日)

项目已升级到最新版本的Vue、Vite和Nuxt：

- Vue 已升级到 v3.5.13
- Vite 已升级到 v6.2.2
- Nuxt 已升级到 v3.16.0

其他主要依赖版本：
- ant-design-vue: v4.2.6
- axios: v1.8.3
- pinia: v3.0.1
- vue-i18n: v11.1.2
- vue-router: v4.5.0
- @nuxtjs/i18n: v9.3.1
- @nuxtjs/tailwindcss: v6.13.1
- unocss: v66.1.0-beta.5
- TypeScript: v5.8.2
- ESLint: v9.22.0
- PostCSS: v8.5.3

升级内容包括：

1. **依赖更新**：
   - 所有核心依赖已更新到最新版本
   - 插件和工具依赖也已相应更新

2. **配置文件更新**：
   - `vite.config.ts` 已更新以适配 Vite 6
   - `tsconfig.json` 已更新以解决类型声明问题
   - `nuxt.config.ts` 已创建以支持 Nuxt 3
   - `uno.config.ts` 已创建以支持 UnoCSS

3. **项目结构优化**：
   - 清晰的工作区结构，包含三个主要模块：admin、website和shared
   - 每个模块独立的package.json
   - pnpm工作区配置

4. **共享模块开发**：
   - API封装模块
   - 类型定义模块
   - 工具函数模块

5. **样式文件配置**：
   - website项目的主CSS文件和Tailwind CSS文件
   - 全局和组件样式配置

## 项目结构

```
company-website/
├── packages/                # 子包目录
│   ├── website/             # 企业官网前台 (Nuxt.js)
│   └── admin/               # 企业官网管理后台 (Vue3 + Vite)
├── shared/                  # 共享模块
│   ├── api.ts               # API接口封装
│   ├── types.ts             # 类型定义
│   ├── utils.ts             # 公共工具函数
│   └── index.ts             # 共享模块导出
├── pnpm-workspace.yaml      # 工作区配置
└── package.json             # 根项目配置
```

## 技术栈

- **企业官网前台**：
  - Nuxt.js 3
  - TypeScript
  - TailwindCSS
  - i18n国际化

- **企业官网管理后台**：
  - Vue 3
  - TypeScript
  - Vite
  - Ant Design Vue
  - Pinia

- **共享模块**：
  - TypeScript
  - Axios

## 开发环境设置

### 前提条件

- Node.js 16+
- pnpm 7+

### 安装依赖

```bash
# 安装pnpm (如果尚未安装)
npm install -g pnpm

# 安装所有工作区依赖
pnpm install
```

### 启动开发服务器

```bash
# 启动企业官网前台
pnpm dev:website

# 启动企业官网管理后台
pnpm dev:admin
```

### 构建生产版本

```bash
# 构建所有项目
pnpm build:all

# 单独构建企业官网前台
pnpm build:website

# 单独构建企业官网管理后台
pnpm build:admin
```

## 后端API

企业官网的后端服务使用SpringBoot构建，默认API地址为：
- 开发环境：`http://localhost:8080/api`
- 生产环境：根据环境变量`API_BASE_URL`配置

## 贡献指南

1. 所有共享代码应放在`shared`目录
2. 保持模块独立，避免循环依赖
3. 遵循TypeScript和ESLint规范
4. 提交前运行lint检查

## 许可证

[MIT](LICENSE) 