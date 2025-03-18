<template>
  <div class="article-list">
    <a-card class="table-card">
      <!-- 搜索和操作区域 -->
      <div class="table-operations">
        <div class="left">
          <a-button type="primary" @click="handleAdd">
            <template #icon><plus-outlined /></template>
            添加文章
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
          <a-space>
            <a-select
              v-model:value="filterCategory"
              style="width: 120px"
              placeholder="选择分类"
              @change="handleSearch"
            >
              <a-select-option value="">全部分类</a-select-option>
              <a-select-option value="news">新闻</a-select-option>
              <a-select-option value="blog">博客</a-select-option>
              <a-select-option value="product">产品</a-select-option>
            </a-select>
            <a-input-search
              v-model:value="searchText"
              placeholder="请输入标题或内容"
              style="width: 250px"
              @search="handleSearch"
            />
          </a-space>
        </div>
      </div>
      
      <!-- 表格 -->
      <a-table
        :columns="columns"
        :data-source="articleData"
        :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        row-key="id"
      >
        <!-- 标题列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <div class="article-title">
              <a-tag v-if="record.isTop" color="red">置顶</a-tag>
              <span>{{ record.title }}</span>
            </div>
          </template>
          
          <!-- 分类列 -->
          <template v-if="column.key === 'category'">
            <a-tag :color="getCategoryColor(record.category)">
              {{ getCategoryName(record.category) }}
            </a-tag>
          </template>
          
          <!-- 状态列 -->
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'published' ? 'success' : (record.status === 'draft' ? 'default' : 'warning')">
              {{ getStatusName(record.status) }}
            </a-tag>
          </template>
          
          <!-- 操作列 -->
          <template v-if="column.key === 'action'">
            <div class="action-buttons">
              <a-button type="link" size="small" @click="handleView(record)">
                <template #icon><eye-outlined /></template>
                查看
              </a-button>
              <a-divider type="vertical" />
              <a-button type="link" size="small" @click="handleEdit(record)">
                <template #icon><edit-outlined /></template>
                编辑
              </a-button>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定要删除此文章吗?"
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
    
    <!-- 文章表单弹窗 -->
    <a-modal
      v-model:visible="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
      :confirm-loading="modalLoading"
      width="800px"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="formRules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formState.title" placeholder="请输入文章标题" />
        </a-form-item>
        
        <a-form-item label="分类" name="category">
          <a-select v-model:value="formState.category" placeholder="请选择分类">
            <a-select-option value="news">新闻</a-select-option>
            <a-select-option value="blog">博客</a-select-option>
            <a-select-option value="product">产品</a-select-option>
          </a-select>
        </a-form-item>
        
        <a-form-item label="摘要" name="summary">
          <a-textarea v-model:value="formState.summary" placeholder="请输入文章摘要" :rows="3" />
        </a-form-item>
        
        <a-form-item label="内容" name="content">
          <a-textarea v-model:value="formState.content" placeholder="请输入文章内容" :rows="6" />
        </a-form-item>
        
        <a-form-item label="标签" name="tags">
          <a-select
            v-model:value="formState.tags"
            mode="tags"
            placeholder="请输入标签"
            :token-separators="[',']"
          ></a-select>
        </a-form-item>
        
        <a-form-item label="状态" name="status">
          <a-radio-group v-model:value="formState.status">
            <a-radio value="published">发布</a-radio>
            <a-radio value="draft">草稿</a-radio>
            <a-radio value="pending">待审核</a-radio>
          </a-radio-group>
        </a-form-item>
        
        <a-form-item label="置顶" name="isTop">
          <a-switch v-model:checked="formState.isTop" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined
} from '@ant-design/icons-vue';

// 表格列定义
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    sorter: true
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    filters: [
      { text: '新闻', value: 'news' },
      { text: '博客', value: 'blog' },
      { text: '产品', value: 'product' }
    ]
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: '发布时间',
    dataIndex: 'publishDate',
    key: 'publishDate',
    sorter: true
  },
  {
    title: '阅读量',
    dataIndex: 'views',
    key: 'views',
    sorter: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: '已发布', value: 'published' },
      { text: '草稿', value: 'draft' },
      { text: '待审核', value: 'pending' }
    ]
  },
  {
    title: '操作',
    key: 'action',
    width: 200
  }
];

// 模拟文章数据
const mockArticles = [
  {
    id: '1',
    title: '公司新产品发布会圆满成功',
    category: 'news',
    author: '张三',
    publishDate: '2023-05-15',
    views: 1250,
    status: 'published',
    summary: '我们的新产品发布会在上海举行，吸引了众多媒体和客户参与...',
    content: '详细内容...',
    tags: ['产品', '发布会', '新闻'],
    isTop: true
  },
  {
    id: '2',
    title: '如何提高工作效率：10个实用技巧',
    category: 'blog',
    author: '李四',
    publishDate: '2023-04-20',
    views: 3580,
    status: 'published',
    summary: '在当今快节奏的工作环境中，提高效率变得尤为重要...',
    content: '详细内容...',
    tags: ['效率', '工作', '技巧'],
    isTop: false
  },
  {
    id: '3',
    title: '新版软件功能详解',
    category: 'product',
    author: '王五',
    publishDate: '2023-03-10',
    views: 2100,
    status: 'published',
    summary: '本文将详细介绍我们最新版本软件的功能和改进...',
    content: '详细内容...',
    tags: ['软件', '功能', '更新'],
    isTop: false
  },
  {
    id: '4',
    title: '行业趋势分析报告',
    category: 'blog',
    author: '赵六',
    publishDate: '2023-02-28',
    views: 1890,
    status: 'draft',
    summary: '本报告分析了当前行业的主要趋势和未来发展方向...',
    content: '详细内容...',
    tags: ['趋势', '分析', '报告'],
    isTop: false
  },
  {
    id: '5',
    title: '客户成功案例：如何提升销售额30%',
    category: 'news',
    author: '张三',
    publishDate: '2023-01-15',
    views: 2450,
    status: 'pending',
    summary: '本案例分享了我们的客户如何通过使用我们的产品提升销售额...',
    content: '详细内容...',
    tags: ['案例', '销售', '成功'],
    isTop: false
  }
];

// 表格数据和状态
const articleData = ref(mockArticles);
const loading = ref(false);
const selectedRowKeys = ref<string[]>([]);
const searchText = ref('');
const filterCategory = ref('');

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: mockArticles.length,
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
  title: '',
  category: 'news',
  author: '当前用户',
  summary: '',
  content: '',
  tags: [] as string[],
  status: 'draft',
  isTop: false
});

// 表单验证规则
const formRules: Record<string, Rule[]> = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 2, max: 100, message: '标题长度必须在2-100个字符之间', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  summary: [
    { required: true, message: '请输入文章摘要', trigger: 'blur' },
    { max: 200, message: '摘要最多200个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
};

// 计算属性：弹窗标题
const modalTitle = computed(() => modalType.value === 'add' ? '添加文章' : '编辑文章');

// 生命周期钩子
onMounted(() => {
  fetchArticleData();
});

// 获取文章数据
function fetchArticleData() {
  loading.value = true;
  // 模拟API请求
  setTimeout(() => {
    articleData.value = mockArticles;
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
    let filteredData = [...mockArticles];
    
    if (filters.category && filters.category.length > 0) {
      filteredData = filteredData.filter(item => filters.category.includes(item.category));
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
    
    articleData.value = filteredData;
    loading.value = false;
  }, 500);
}

// 搜索处理
function handleSearch() {
  loading.value = true;
  
  // 模拟API请求
  setTimeout(() => {
    let filteredData = [...mockArticles];
    
    // 处理分类筛选
    if (filterCategory.value) {
      filteredData = filteredData.filter(item => item.category === filterCategory.value);
    }
    
    // 处理关键词搜索
    if (searchText.value) {
      const searchLower = searchText.value.toLowerCase();
      filteredData = filteredData.filter(
        article => article.title.toLowerCase().includes(searchLower) || 
                  article.summary.toLowerCase().includes(searchLower) ||
                  article.content.toLowerCase().includes(searchLower)
      );
    }
    
    articleData.value = filteredData;
    loading.value = false;
  }, 500);
}

// 刷新处理
function handleRefresh() {
  searchText.value = '';
  filterCategory.value = '';
  selectedRowKeys.value = [];
  fetchArticleData();
}

// 添加文章
function handleAdd() {
  modalType.value = 'add';
  resetForm();
  modalVisible.value = true;
}

// 查看文章
function handleView(record: any) {
  // 实际项目中可能会跳转到文章详情页
  message.info(`查看文章：${record.title}`);
}

// 编辑文章
function handleEdit(record: any) {
  modalType.value = 'edit';
  resetForm();
  
  // 填充表单数据
  Object.assign(formState, {
    id: record.id,
    title: record.title,
    category: record.category,
    summary: record.summary,
    content: record.content,
    tags: record.tags,
    status: record.status,
    isTop: record.isTop
  });
  
  modalVisible.value = true;
}

// 删除文章
function handleDelete(record: any) {
  loading.value = true;
  
  // 模拟API请求
  setTimeout(() => {
    articleData.value = articleData.value.filter(item => item.id !== record.id);
    message.success('删除成功');
    loading.value = false;
  }, 500);
}

// 批量删除
function handleBatchDelete() {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请选择要删除的文章');
    return;
  }
  
  loading.value = true;
  
  // 模拟API请求
  setTimeout(() => {
    articleData.value = articleData.value.filter(
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
        // 添加文章
        const newArticle = {
          id: Date.now().toString(),
          title: formState.title,
          category: formState.category,
          author: formState.author,
          publishDate: new Date().toISOString().split('T')[0],
          views: 0,
          summary: formState.summary,
          content: formState.content,
          tags: formState.tags,
          status: formState.status,
          isTop: formState.isTop
        };
        
        articleData.value = [newArticle, ...articleData.value];
        message.success('添加成功');
      } else {
        // 更新文章
        const index = articleData.value.findIndex(item => item.id === formState.id);
        if (index !== -1) {
          articleData.value[index] = {
            ...articleData.value[index],
            title: formState.title,
            category: formState.category,
            summary: formState.summary,
            content: formState.content,
            tags: formState.tags,
            status: formState.status,
            isTop: formState.isTop
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
  formState.title = '';
  formState.category = 'news';
  formState.summary = '';
  formState.content = '';
  formState.tags = [];
  formState.status = 'draft';
  formState.isTop = false;
  
  // 重置表单验证
  formRef.value?.resetFields();
}

// 获取分类名称
function getCategoryName(category: string): string {
  const categoryMap: Record<string, string> = {
    news: '新闻',
    blog: '博客',
    product: '产品'
  };
  return categoryMap[category] || category;
}

// 获取分类颜色
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    news: 'blue',
    blog: 'green',
    product: 'orange'
  };
  return colorMap[category] || 'default';
}

// 获取状态名称
function getStatusName(status: string): string {
  const statusMap: Record<string, string> = {
    published: '已发布',
    draft: '草稿',
    pending: '待审核'
  };
  return statusMap[status] || status;
}
</script>

<style lang="scss" scoped>
.article-list {
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
  
  .article-title {
    display: flex;
    align-items: center;
    
    .ant-tag {
      margin-right: 8px;
    }
  }
  
  .action-buttons {
    display: flex;
    align-items: center;
  }
}
</style> 