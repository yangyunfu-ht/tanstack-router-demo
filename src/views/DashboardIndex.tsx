import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import ReactECharts from 'echarts-for-react'
import { useThemeStore } from '@/stores/useThemeStore'

const DashboardIndex: React.FC = () => {
  const navigate = useNavigate()
  const { theme } = useThemeStore()

  const handleClick = () => {
    navigate({ to: '/' })
  }

  // 饼图配置
  const pieOption = {
    backgroundColor: 'transparent',
    title: {
      text: '访问来源',
      left: 'center',
      textStyle: {
        color: theme === 'dark' ? '#fff' : '#333',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: theme === 'dark' ? '#ccc' : '#333',
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        label: {
          color: theme === 'dark' ? '#fff' : '#333',
        },
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  // 柱状图配置
  const barOption = {
    backgroundColor: 'transparent',
    title: {
      text: '周销售额',
      textStyle: {
        color: theme === 'dark' ? '#fff' : '#333',
      },
    },
    tooltip: {},
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: {
        color: theme === 'dark' ? '#ccc' : '#333',
      },
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#555' : '#ccc',
        },
      },
    },
    yAxis: {
      axisLabel: {
        color: theme === 'dark' ? '#ccc' : '#333',
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#444' : '#eee',
        },
      },
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 15],
        itemStyle: {
          color: '#5470C6',
        },
      },
    ],
  }

  // 折线图配置
  const lineOption = {
    backgroundColor: 'transparent',
    title: {
      text: '用户增长趋势',
      textStyle: {
        color: theme === 'dark' ? '#fff' : '#333',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
      axisLabel: {
        color: theme === 'dark' ? '#ccc' : '#333',
      },
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#555' : '#ccc',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: theme === 'dark' ? '#ccc' : '#333',
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#444' : '#eee',
        },
      },
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        smooth: true,
        areaStyle: {},
      },
    ],
  }

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
          仪表盘概览
        </h2>
        <button
          onClick={handleClick}
          className='px-4 py-2 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white rounded-md transition shadow-sm cursor-pointer'
        >
          返回首页
        </button>
      </div>

      <div className='flex flex-col gap-6'>
        {/* 饼图卡片 */}
        <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-200'>
          <ReactECharts
            option={pieOption}
            style={{ height: '300px' }}
            theme={theme}
          />
        </div>
        {/* 柱状图卡片 */}
        <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-200'>
          <ReactECharts
            option={barOption}
            style={{ height: '300px' }}
            theme={theme}
          />
        </div>
        {/* 折线图卡片 - 占据全宽 */}
        <div className='col-span-1 md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-200'>
          <ReactECharts
            option={lineOption}
            style={{ height: '350px' }}
            theme={theme}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardIndex
