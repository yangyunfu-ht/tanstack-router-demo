import React from 'react'
import { Timeline, TimelineItem } from '@/components/Timeline'

const TimelineDemo: React.FC = () => {
  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
          Timeline 时间线示例
        </h1>
        <p className='text-gray-600 dark:text-gray-400'>
          用于展示时间流信息，支持自定义颜色、图标和节点样式。
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* 基础用法 */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
            基础用法
          </h2>
          <Timeline>
            <TimelineItem
              label='2024-02-13 10:00'
              color='primary'
            >
              <h3 className='font-medium'>创建项目</h3>
              <p className='text-gray-500 text-sm'>
                初始化项目结构，配置基础环境
              </p>
            </TimelineItem>
            <TimelineItem
              label='2024-02-13 14:30'
              color='success'
            >
              <h3 className='font-medium'>集成 AG Grid</h3>
              <p className='text-gray-500 text-sm'>
                完成表格组件封装与主题适配
              </p>
            </TimelineItem>
            <TimelineItem
              label='2024-02-13 16:45'
              color='warning'
            >
              <h3 className='font-medium'>添加暗黑模式</h3>
              <p className='text-gray-500 text-sm'>实现全局主题切换功能</p>
            </TimelineItem>
            <TimelineItem
              label='2024-02-14 09:15'
              color='info'
            >
              <h3 className='font-medium'>发布 v1.0.0</h3>
              <p className='text-gray-500 text-sm'>
                完成所有核心功能开发并发布
              </p>
            </TimelineItem>
          </Timeline>
        </section>

        {/* 自定义图标与颜色 */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
            自定义图标与状态
          </h2>
          <Timeline>
            <TimelineItem
              label='Step 1'
              color='success'
              icon={
                <svg
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              }
            >
              <h3 className='font-medium'>支付成功</h3>
              <p className='text-gray-500 text-sm'>订单支付流程已完成</p>
            </TimelineItem>
            <TimelineItem
              label='Step 2'
              color='primary'
              icon={
                <svg
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                  />
                </svg>
              }
            >
              <h3 className='font-medium'>仓库处理中</h3>
              <p className='text-gray-500 text-sm'>正在打包商品</p>
            </TimelineItem>
            <TimelineItem
              label='Step 3'
              color='warning'
              icon={
                <svg
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              }
            >
              <h3 className='font-medium'>运输中</h3>
              <p className='text-gray-500 text-sm'>
                包裹已发出，正在前往目的地
              </p>
            </TimelineItem>
            <TimelineItem
              label='Step 4'
              color='danger'
              icon={
                <svg
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              }
            >
              <h3 className='font-medium'>派送异常</h3>
              <p className='text-gray-500 text-sm'>由于天气原因，派送延迟</p>
            </TimelineItem>
            <TimelineItem
              label='End'
              color='gray'
            >
              <h3 className='font-medium'>等待收货</h3>
            </TimelineItem>
          </Timeline>
        </section>
      </div>
    </div>
  )
}

export default TimelineDemo
