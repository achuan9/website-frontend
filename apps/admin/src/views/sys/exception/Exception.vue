<template>
  <div class="exception-page">
    <div class="exception-content">
      <h1 class="exception-code">{{ status }}</h1>
      <h2 class="exception-title">{{ title }}</h2>
      <p class="exception-desc">{{ description }}</p>
      <a-button type="primary" @click="goHome">返回首页</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  status: {
    type: Number,
    default: 404,
  },
});

const router = useRouter();

const title = computed(() => {
  switch (props.status) {
    case 403:
      return '抱歉，您无权访问此页面';
    case 404:
      return '抱歉，您访问的页面不存在';
    case 500:
      return '抱歉，服务器出错了';
    default:
      return '抱歉，未知错误';
  }
});

const description = computed(() => {
  switch (props.status) {
    case 403:
      return '您没有权限访问此页面，请联系管理员';
    case 404:
      return '您访问的页面不存在，请检查URL是否正确';
    case 500:
      return '服务器遇到了一个错误，请稍后再试';
    default:
      return '发生了未知错误，请联系管理员';
  }
});

function goHome() {
  router.push('/');
}
</script>

<style lang="scss" scoped>
.exception-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f5f5;
}

.exception-content {
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  max-width: 500px;
}

.exception-code {
  font-size: 72px;
  color: #1890ff;
  margin-bottom: 16px;
}

.exception-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
}

.exception-desc {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
}
</style> 