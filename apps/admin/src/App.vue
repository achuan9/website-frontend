<template>
  <ConfigProvider :locale="locale">
    <div class="app-container">
      <RouterView />
    </div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { ref } from 'vue';

const locale = ref(zhCN);
</script>

<style lang="scss">
// 全局样式
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
}

.app-container {
  width: 100%;
  height: 100%;
}
</style> 