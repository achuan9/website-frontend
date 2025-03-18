<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="login-logo">
        <img src="../../../assets/images/logo.svg" alt="Logo" />
        <h1>企业管理系统</h1>
      </div>
      
      <a-form
        :model="formData"
        :rules="formRules"
        ref="formRef"
        @finish="handleSubmit"
        class="login-form"
      >
        <a-form-item name="username">
          <a-input
            v-model:value="formData.username"
            placeholder="请输入用户名"
            size="large"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        
        <a-form-item name="password">
          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入密码"
            size="large"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        
        <a-form-item>
          <a-checkbox v-model:checked="rememberMe">记住我</a-checkbox>
          <a class="login-form-forgot" href="#">忘记密码</a>
        </a-form-item>
        
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            :loading="loading"
            block
            size="large"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const router = useRouter();
const formRef = ref();
const loading = ref(false);
const rememberMe = ref(false);

const formData = reactive({
  username: '',
  password: '',
});

const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

async function handleSubmit() {
  try {
    loading.value = true;
    // 模拟登录
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 假设登录成功
    message.success('登录成功');
    router.push('/dashboard');
  } catch (error: any) {
    message.error(error.message || '登录失败');
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.login-form-wrapper {
  width: 368px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.login-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  
  img {
    width: 64px;
    height: 64px;
    margin-bottom: 12px;
  }
  
  h1 {
    font-size: 24px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
}

.login-form-forgot {
  float: right;
}

.login-form-button {
  margin-top: 10px;
}
</style> 