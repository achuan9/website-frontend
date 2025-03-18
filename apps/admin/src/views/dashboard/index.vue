<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <div class="stat-cards">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card class="stat-card">
            <template #title>
              <div class="card-title">
                <user-outlined class="icon" />
                <span>用户总数</span>
              </div>
            </template>
            <div class="card-content">
              <div class="card-value">8,846</div>
              <div class="card-footer">
                <span class="trend up">
                  <arrow-up-outlined /> 12%
                </span>
                <span class="period">较上周</span>
              </div>
            </div>
          </a-card>
        </a-col>
        
        <a-col :span="6">
          <a-card class="stat-card">
            <template #title>
              <div class="card-title">
                <shopping-outlined class="icon" />
                <span>订单数量</span>
              </div>
            </template>
            <div class="card-content">
              <div class="card-value">1,257</div>
              <div class="card-footer">
                <span class="trend up">
                  <arrow-up-outlined /> 5.2%
                </span>
                <span class="period">较上周</span>
              </div>
            </div>
          </a-card>
        </a-col>
        
        <a-col :span="6">
          <a-card class="stat-card">
            <template #title>
              <div class="card-title">
                <fund-outlined class="icon" />
                <span>销售额</span>
              </div>
            </template>
            <div class="card-content">
              <div class="card-value">¥126,560</div>
              <div class="card-footer">
                <span class="trend down">
                  <arrow-down-outlined /> 2.5%
                </span>
                <span class="period">较上周</span>
              </div>
            </div>
          </a-card>
        </a-col>
        
        <a-col :span="6">
          <a-card class="stat-card">
            <template #title>
              <div class="card-title">
                <message-outlined class="icon" />
                <span>评论数</span>
              </div>
            </template>
            <div class="card-content">
              <div class="card-value">3,562</div>
              <div class="card-footer">
                <span class="trend up">
                  <arrow-up-outlined /> 8.4%
                </span>
                <span class="period">较上周</span>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    
    <!-- 图表区域 -->
    <div class="chart-section">
      <a-row :gutter="16">
        <!-- 销售趋势图 -->
        <a-col :span="16">
          <a-card title="销售趋势" class="chart-card">
            <div class="chart-container" ref="salesChartRef"></div>
          </a-card>
        </a-col>
        
        <!-- 访问来源 -->
        <a-col :span="8">
          <a-card title="访问来源" class="chart-card">
            <div class="chart-container" ref="sourceChartRef"></div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    
    <!-- 最近活动 -->
    <a-card title="最近活动" class="recent-activity">
      <a-timeline>
        <a-timeline-item color="green">
          <template #dot>
            <check-circle-outlined />
          </template>
          <div class="activity-item">
            <div class="activity-title">
              <span class="user">张三</span>
              <span class="action">完成了任务</span>
              <a href="#">网站首页设计</a>
            </div>
            <div class="activity-time">2小时前</div>
          </div>
        </a-timeline-item>
        
        <a-timeline-item color="blue">
          <template #dot>
            <user-outlined />
          </template>
          <div class="activity-item">
            <div class="activity-title">
              <span class="user">李四</span>
              <span class="action">添加了新用户</span>
              <a href="#">王五</a>
            </div>
            <div class="activity-time">3小时前</div>
          </div>
        </a-timeline-item>
        
        <a-timeline-item color="red">
          <template #dot>
            <warning-outlined />
          </template>
          <div class="activity-item">
            <div class="activity-title">
              <span class="user">系统</span>
              <span class="action">发出警告</span>
              <a href="#">服务器负载过高</a>
            </div>
            <div class="activity-time">5小时前</div>
          </div>
        </a-timeline-item>
        
        <a-timeline-item color="orange">
          <template #dot>
            <notification-outlined />
          </template>
          <div class="activity-item">
            <div class="activity-title">
              <span class="user">系统</span>
              <span class="action">发布了公告</span>
              <a href="#">系统将于今晚22:00进行维护</a>
            </div>
            <div class="activity-time">8小时前</div>
          </div>
        </a-timeline-item>
      </a-timeline>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import { LineChart, PieChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {
  UserOutlined,
  ShoppingOutlined,
  FundOutlined,
  MessageOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  NotificationOutlined
} from '@ant-design/icons-vue';

// 注册 ECharts 组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  PieChart,
  CanvasRenderer,
  UniversalTransition
]);

const salesChartRef = ref<HTMLElement | null>(null);
const sourceChartRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // 初始化销售趋势图表
  if (salesChartRef.value) {
    const salesChart = echarts.init(salesChartRef.value);
    
    const salesOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['销售额', '订单量']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '销售额',
          type: 'line',
          smooth: true,
          data: [18000, 22000, 19000, 27000, 25000, 32000, 30000],
          itemStyle: {
            color: '#1890ff'
          }
        },
        {
          name: '订单量',
          type: 'line',
          smooth: true,
          data: [120, 180, 150, 210, 190, 230, 220],
          itemStyle: {
            color: '#52c41a'
          }
        }
      ]
    };
    
    salesChart.setOption(salesOption);
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
      salesChart.resize();
    });
  }
  
  // 初始化访问来源图表
  if (sourceChartRef.value) {
    const sourceChart = echarts.init(sourceChartRef.value);
    
    const sourceOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: ['直接访问', '搜索引擎', '社交媒体', '外部链接', '其他']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '直接访问' },
            { value: 735, name: '搜索引擎' },
            { value: 580, name: '社交媒体' },
            { value: 484, name: '外部链接' },
            { value: 300, name: '其他' }
          ]
        }
      ]
    };
    
    sourceChart.setOption(sourceOption);
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
      sourceChart.resize();
    });
  }
});
</script>

<style lang="scss" scoped>
.dashboard {
  .stat-cards {
    margin-bottom: 16px;
    
    .stat-card {
      .card-title {
        display: flex;
        align-items: center;
        
        .icon {
          margin-right: 8px;
          font-size: 16px;
        }
      }
      
      .card-content {
        padding: 8px 0;
        
        .card-value {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .card-footer {
          display: flex;
          align-items: center;
          
          .trend {
            display: flex;
            align-items: center;
            margin-right: 8px;
            
            &.up {
              color: #52c41a;
            }
            
            &.down {
              color: #f5222d;
            }
          }
          
          .period {
            color: rgba(0, 0, 0, 0.45);
            font-size: 12px;
          }
        }
      }
    }
  }
  
  .chart-section {
    margin-bottom: 16px;
    
    .chart-card {
      .chart-container {
        height: 300px;
      }
    }
  }
  
  .recent-activity {
    .activity-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      
      .activity-title {
        .user {
          font-weight: 500;
          margin-right: 4px;
        }
        
        .action {
          color: rgba(0, 0, 0, 0.65);
          margin-right: 4px;
        }
      }
      
      .activity-time {
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
      }
    }
  }
}
</style> 