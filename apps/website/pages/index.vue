<template>
  <div>
    <!-- 英雄区域 -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- 文本内容 -->
          <div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-white">
              创新解决方案，助力企业成长
            </h1>
            <p class="text-xl mb-8 text-primary-100">
              我们提供专业的服务和产品，帮助您的企业实现数字化转型
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/services" class="btn bg-white text-primary-700 hover:bg-primary-50">
                了解我们的服务
              </NuxtLink>
              <NuxtLink to="/contact" class="btn bg-transparent border-2 border-white hover:bg-white/10">
                联系我们
              </NuxtLink>
            </div>
            
            <!-- 客户信任 -->
            <div class="mt-12">
              <p class="text-sm uppercase tracking-wider mb-4 text-primary-200">
                受到信赖的合作伙伴
              </p>
              <div class="flex flex-wrap gap-8 items-center">
                <img src="/clients/client1.svg" alt="客户1" class="h-8 opacity-80" />
                <img src="/clients/client2.svg" alt="客户2" class="h-8 opacity-80" />
                <img src="/clients/client3.svg" alt="客户3" class="h-8 opacity-80" />
                <img src="/clients/client4.svg" alt="客户4" class="h-8 opacity-80" />
              </div>
            </div>
          </div>
          
          <!-- 图片 -->
          <div class="relative">
            <img src="/images/hero-image.svg" alt="业务解决方案" class="rounded-lg shadow-xl w-full" />
            <!-- 浮动卡片 -->
            <div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-custom">
              <div class="flex items-center gap-3">
                <div class="bg-primary-100 p-2 rounded-full">
                  <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">实时数据分析</p>
                  <p class="text-xs text-gray-500">提升业务决策效率</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部波浪 -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto">
          <path fill="#f8fafc" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
    
    <!-- 关于我们 -->
    <section class="py-20 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">关于我们</h2>
          <p class="text-xl text-gray-600">专业团队，卓越服务</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- 图片 -->
          <div class="relative">
            <img src="/images/about-image.svg" alt="关于我们" class="rounded-lg shadow-lg w-full" />
            <!-- 客户满意度卡片 -->
            <div class="absolute top-4 -right-4 bg-white p-4 rounded-lg shadow-custom">
              <div class="flex items-center gap-3">
                <div class="bg-green-100 p-2 rounded-full">
                  <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">98%</p>
                  <p class="text-xs text-gray-500">客户满意度</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 文本内容 -->
          <div>
            <p class="text-lg mb-6 text-gray-700">
              我们是一家拥有10年行业经验的企业，专注于为客户提供高质量的产品和服务。我们的团队由行业专家组成，致力于为客户创造价值。
            </p>
            
            <!-- 核心优势 -->
            <div class="grid grid-cols-2 gap-6 mt-8">
              <div class="flex items-start gap-3">
                <div class="bg-primary-100 p-2 rounded-full">
                  <svg class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">专业团队</h3>
                  <p class="text-sm text-gray-600">专业团队提供优质服务</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="bg-primary-100 p-2 rounded-full">
                  <svg class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">创新技术</h3>
                  <p class="text-sm text-gray-600">创新技术解决方案</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="bg-primary-100 p-2 rounded-full">
                  <svg class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">优质服务</h3>
                  <p class="text-sm text-gray-600">高质量服务保障</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="bg-primary-100 p-2 rounded-full">
                  <svg class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">行业经验</h3>
                  <p class="text-sm text-gray-600">10年行业经验积累</p>
                </div>
              </div>
            </div>
            
            <NuxtLink to="/about" class="inline-flex items-center mt-8 text-primary-600 hover:text-primary-700">
              了解更多
              <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 服务 -->
    <section class="py-20 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">我们的服务</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            我们提供全方位的服务，满足您的各种需求。从咨询到实施，我们都能为您提供专业的支持。
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- 咨询服务 -->
          <div class="bg-white rounded-lg shadow-custom p-6 hover:shadow-lg transition-shadow">
            <div class="bg-primary-100 p-3 rounded-full inline-block mb-4">
              <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">咨询服务</h3>
            <p class="text-gray-600 mb-4">专业的咨询服务，帮助您分析需求并制定实施计划。</p>
            
            <ul class="space-y-2 mb-6">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>需求分析</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>战略规划</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>解决方案设计</span>
              </li>
            </ul>
            
            <NuxtLink to="/services/consulting" class="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
              了解更多
              <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
          
          <!-- 产品开发 -->
          <div class="bg-white rounded-lg shadow-custom p-6 hover:shadow-lg transition-shadow">
            <div class="bg-primary-100 p-3 rounded-full inline-block mb-4">
              <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">产品开发</h3>
            <p class="text-gray-600 mb-4">定制化的产品开发服务，满足您的特定业务流程需求。</p>
            
            <ul class="space-y-2 mb-6">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>定制开发</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>系统集成</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>用户体验设计</span>
              </li>
            </ul>
            
            <NuxtLink to="/services/development" class="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
              了解更多
              <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
          
          <!-- 技术支持 -->
          <div class="bg-white rounded-lg shadow-custom p-6 hover:shadow-lg transition-shadow">
            <div class="bg-primary-100 p-3 rounded-full inline-block mb-4">
              <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">技术支持</h3>
            <p class="text-gray-600 mb-4">全面的技术支持和维护服务，确保系统稳定运行。</p>
            
            <ul class="space-y-2 mb-6">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>7x24小时支持</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>定期维护</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>问题快速响应</span>
              </li>
            </ul>
            
            <NuxtLink to="/services/support" class="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
              了解更多
              <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink to="/services" class="btn btn-primary">
            查看全部
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});
</script> 