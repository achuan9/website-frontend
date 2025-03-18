<template>
  <div class="user-list">
    <a-card class="table-card">
      <!-- 搜索和操作区域 -->
      <div class="table-operations">
        <div class="left">
          <a-button type="primary" @click="handleAdd">
            <template #icon><plus-outlined /></template>
            添加用户
          </a-button>
          <a-button :disabled="!selectedRowKeys.length" @click="handleBatchDelete">
            <template #icon><delete-outlined /></template>
            批量删除
          </a-button>
          <a-button @click="handleRefresh">
            <template #icon><reload-outlined /></template>
            刷新
          </a-button>
        </div>
        <div class="right">
          <a-input-search
            v-model:value="searchText"
            placeholder="请输入用户名或邮箱"
            style="width: 250px"
            @search="handleSearch"
          />
        </div>
      </div>
      
      <!-- 表格 -->
      <a-table
        :columns="columns"
        :data-source="userData"
        :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        row-key="id"
      >
        <!-- 用户名列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="user-cell">
              <a-avatar :src="record.avatar">{{ record.name.charAt(0) }}</a-avatar>
              <span class="user-name">{{ record.name }}</span>
            </div>
          </template>
          
          <!-- 状态列 -->
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status ? 'success' : 'error'">
              {{ record.status ? '启用' : '禁用' }}
            </a-tag>
          </template>
          
          <!-- 操作列 -->
          <template v-if="column.key === 'action'">
            <div class="action-buttons">
              <a-button type="link" size="small" @click="handleEdit(record)">
                <template #icon><edit-outlined /></template>
                编辑
              </a-button>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定要删除此用户吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDelete(record)"
              >
                <a-button type="link" danger size="small">
                  <template #icon><delete-outlined /></template>
                  删除
                </a-button>
              </a-popconfirm>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
    
    <!-- 用户表单弹窗 -->
    <a-modal
      v-model:visible="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
      :confirm-loading="modalLoading"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="formRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="用户名" name="name">
          <a-input v-model:value="formState.name" placeholder="请输入用户名" />
        </a-form-item>
        
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
        </a-form-item>
        
        <a-form-item label="角色" name="role">
          <a-select v-model:value="formState.role" placeholder="请选择角色">
            <a-select-option value="admin">管理员</a-select-option>
            <a-select-option value="editor">编辑</a-select-option>
            <a-select-option value="user">普通用户</a-select-option>
          </a-select>
        </a-form-item>
        
        <a-form-item label="状态" name="status">
          <a-switch v-model:checked="formState.status" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined
} from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';

// 表格列定义
const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    filters: [
      { text: '管理员', value: 'admin' },
      { text: '编辑', value: 'editor' },
      { text: '普通用户', value: 'user' }
    ]
  },
  {
    title: '注册时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: '启用', value: true },
      { text: '禁用', value: false }
    ]
  },
  {
    title: '操作',
    key: 'action',
    width: 150
  }
];

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    createdAt: '2023-01-15',
    status: true,
    avatar: ''
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    role: 'editor',
    createdAt: '2023-02-20',
    status: true,
    avatar: ''
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@example.com',
    role: 'user',
    createdAt: '2023-03-10',
    status: false,
    avatar: ''
  },
  {
    id: '4',
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: 'user',
    createdAt: '2023-04-05',
    status: true,
    avatar: ''
  },
  {
    id: '5',
    name: '钱七',
    email: 'qianqi@example.com',
    role: 'editor',
    createdAt: '2023-05-12',
    status: true,
    avatar: ''
  }
];

// 表格数据和状态
const userData = ref(mockUsers);
const loading = ref(false);
const selectedRowKeys = ref<string[]>([]);
const searchText = ref('');

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: mockUsers.length,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 条`
});

// 表单相关
const formRef = ref<FormInstance>();
const modalVisible = ref(false);
const modalLoading = ref(false);
const modalType = ref<'add' | 'edit'>('add');
const formState = reactive({
  id: '',
  name: '',
  email: '',
  role: 'user',
  status: true
});

// 表单验证规则
const formRules: Record<string, Rule[]> = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度必须在2-20个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
};

// 计算属性：弹窗标题
const modalTitle = computed(() => modalType.value === 'add' ? '添加用户' : '编辑用户');

// 生命周期钩子
onMounted(() => {
  fetchUserData();
});

// 获取用户数据
function fetchUserData() {
  loading.value = true;
  // 模拟API请求
  setTimeout(() => {
    userData.value = mockUsers;
    loading.value = false;
  }, 500);
}

// 表格选择变化
function onSelectChange(keys: string[]) {
  selectedRowKeys.value = keys;
}

// 表格变化处理（排序、筛选、分页）
function handleTableChange(pag: any, filters: any, sorter: any) {
  loading.value = true;
  
  // 更新分页信息
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  
  // 模拟API请求
  setTimeout(() => {
    // 处理筛选
    let filteredData = [...mockUsers];
    
    if (filters.role && filters.role.length > 0) {
      filteredData = filteredData.filter(item => filters.role.includes(item.role));
    }
    
    if (filters.status && filters.status.length > 0) {
      filteredData = filteredData.filter(item => filters.status.includes(item.status));
    }
    
    // 处理排序
    if (sorter.field) {
      filteredData.sort((a, b) => {
        const result = (a as any)[sorter.field] > (b as any)[sorter.field] ? 1 : -1;
        return sorter.order === 'descend' ? -result : result;
      });
    }
    
    userData.value = filteredData;
    loading.value = false;
  }, 500);
}

// 搜索处理
function handleSearch() {
  loading.value = true;
  
  // 模拟API请求
  setTimeout(() => {
    if (searchText.value) {
      const searchLower = searchText.value.toLowerCase();
      userData.value = mockUsers.filter(
        user => user.name.toLowerCase().includes(searchLower) || 
                user.email.toLowerCase().includes(searchLower)
      );
    } else {
      userData.value = mockUsers;
    }
    
    loading.value = false;
  }, 500);
}

// 刷新处理
function handleRefresh() {
  searchText.value = '';
  selectedRowKeys.value = [];
  fetchUserData();
}

// 添加用户
function handleAdd() {
  modalType.value = 'add';
  resetForm();
  modalVisible.value = true;
}

// 编辑用户
function handleEdit(record: any) {
  modalType.value = 'edit';
  resetForm();
  
  // 填充表单数据
  Object.assign(formState, {
    id: record.id,
    name: record.name,
    email: record.email,
    role: record.role,
    status: record.status
  });
  
  modalVisible.value = true;
}

// 删除用户
function handleDelete(record: any) {
  loading.value = true;
  
  // 模拟API请求
  setTimeout(() => {
    userData.value = userData.value.filter(item => item.id !== record.id);
    message.success('删除成功');
    loading.value = false;
  }, 500);
}

// 批量删除
function handleBatchDelete() {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请选择要删除的用户');
    return;
  }
  
  loading.value = true;
  
  // 模拟API请求
  setTimeout(() => {
    userData.value = userData.value.filter(
      item => !selectedRowKeys.value.includes(item.id)
    );
    selectedRowKeys.value = [];
    message.success('批量删除成功');
    loading.value = false;
  }, 500);
}

// 弹窗确认
function handleModalOk() {
  formRef.value?.validate().then(() => {
    modalLoading.value = true;
    
    // 模拟API请求
    setTimeout(() => {
      if (modalType.value === 'add') {
        // 添加用户
        const newUser = {
          id: Date.now().toString(),
          name: formState.name,
          email: formState.email,
          role: formState.role,
          createdAt: new Date().toISOString().split('T')[0],
          status: formState.status,
          avatar: ''
        };
        
        userData.value = [newUser, ...userData.value];
        message.success('添加成功');
      } else {
        // 更新用户
        const index = userData.value.findIndex(item => item.id === formState.id);
        if (index !== -1) {
          userData.value[index] = {
            ...userData.value[index],
            name: formState.name,
            email: formState.email,
            role: formState.role,
            status: formState.status
          };
          message.success('更新成功');
        }
      }
      
      modalVisible.value = false;
      modalLoading.value = false;
    }, 500);
  }).catch(error => {
    console.log('验证失败:', error);
  });
}

// 弹窗取消
function handleModalCancel() {
  modalVisible.value = false;
}

// 重置表单
function resetForm() {
  formState.id = '';
  formState.name = '';
  formState.email = '';
  formState.role = 'user';
  formState.status = true;
  
  // 重置表单验证
  formRef.value?.resetFields();
}
</script>

<style lang="scss" scoped>
.user-list {
  .table-card {
    margin-bottom: 16px;
  }
  
  .table-operations {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    
    .left {
      display: flex;
      gap: 8px;
    }
  }
  
  .user-cell {
    display: flex;
    align-items: center;
    
    .user-name {
      margin-left: 8px;
    }
  }
  
  .action-buttons {
    display: flex;
    align-items: center;
  }
}
</style> 