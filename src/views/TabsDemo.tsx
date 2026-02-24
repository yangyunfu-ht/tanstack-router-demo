import React, { useState } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components/Tabs'

const TabsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account')

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
          Tabs 标签页示例
        </h1>
        <p className='text-gray-600 dark:text-gray-400'>
          提供线性和卡片式等多种样式，支持受控和非受控模式。
        </p>
      </div>

      <div className='space-y-12'>
        {/* Line Variant (Default) */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
            线性样式 (默认)
          </h2>
          <Tabs defaultValue='tab1'>
            <TabList>
              <Tab value='tab1'>用户管理</Tab>
              <Tab value='tab2'>配置中心</Tab>
              <Tab
                value='tab3'
                disabled
              >
                角色权限 (Disabled)
              </Tab>
              <Tab value='tab4'>系统日志</Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                value='tab1'
                className='p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'
              >
                <h3 className='font-medium mb-2'>用户管理内容</h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  这里是用户管理模块的内容区域。
                </p>
              </TabPanel>
              <TabPanel
                value='tab2'
                className='p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'
              >
                <h3 className='font-medium mb-2'>配置中心内容</h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  这里是配置中心模块的内容区域。
                </p>
              </TabPanel>
              <TabPanel
                value='tab4'
                className='p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'
              >
                <h3 className='font-medium mb-2'>系统日志内容</h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  这里是系统日志模块的内容区域。
                </p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>

        {/* Card Variant */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
            卡片样式
          </h2>
          <Tabs
            defaultValue='react'
            variant='card'
          >
            <TabList>
              <Tab value='react'>React</Tab>
              <Tab value='vue'>Vue</Tab>
              <Tab value='angular'>Angular</Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                value='react'
                className='p-6 border border-gray-200 dark:border-gray-700 rounded-lg mt-2'
              >
                <div className='flex items-center gap-4'>
                  <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl'>
                    R
                  </div>
                  <div>
                    <h3 className='font-bold text-lg'>React</h3>
                    <p className='text-gray-500'>
                      A JavaScript library for building user interfaces
                    </p>
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                value='vue'
                className='p-6 border border-gray-200 dark:border-gray-700 rounded-lg mt-2'
              >
                <div className='flex items-center gap-4'>
                  <div className='h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl'>
                    V
                  </div>
                  <div>
                    <h3 className='font-bold text-lg'>Vue</h3>
                    <p className='text-gray-500'>
                      The Progressive JavaScript Framework
                    </p>
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                value='angular'
                className='p-6 border border-gray-200 dark:border-gray-700 rounded-lg mt-2'
              >
                <div className='flex items-center gap-4'>
                  <div className='h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl'>
                    A
                  </div>
                  <div>
                    <h3 className='font-bold text-lg'>Angular</h3>
                    <p className='text-gray-500'>
                      The modern web developer's platform
                    </p>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>

        {/* Pills Variant (Controlled) */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
              胶囊样式 (受控模式)
            </h2>
            <span className='text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300'>
              Current: {activeTab}
            </span>
          </div>

          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            variant='pills'
          >
            <TabList className='bg-gray-100 dark:bg-gray-700 p-1 rounded-full inline-flex'>
              <Tab
                value='account'
                className='min-w-[100px]'
              >
                Account
              </Tab>
              <Tab
                value='password'
                className='min-w-[100px]'
              >
                Password
              </Tab>
              <Tab
                value='notifications'
                className='min-w-[100px]'
              >
                Notifications
              </Tab>
            </TabList>
            <TabPanels className='mt-6'>
              <TabPanel value='account'>
                <div className='space-y-4 max-w-md'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Username
                    </label>
                    <input
                      type='text'
                      defaultValue='johndoe'
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Email
                    </label>
                    <input
                      type='email'
                      defaultValue='john@example.com'
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white'
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value='password'>
                <div className='space-y-4 max-w-md'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Current Password
                    </label>
                    <input
                      type='password'
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      New Password
                    </label>
                    <input
                      type='password'
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white'
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value='notifications'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg'>
                    <div>
                      <h4 className='font-medium'>Email Notifications</h4>
                      <p className='text-sm text-gray-500'>
                        Receive emails about your account activity.
                      </p>
                    </div>
                    <input
                      type='checkbox'
                      defaultChecked
                      className='h-5 w-5 text-blue-600 rounded'
                    />
                  </div>
                  <div className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg'>
                    <div>
                      <h4 className='font-medium'>Push Notifications</h4>
                      <p className='text-sm text-gray-500'>
                        Receive push notifications on your device.
                      </p>
                    </div>
                    <input
                      type='checkbox'
                      className='h-5 w-5 text-blue-600 rounded'
                    />
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>
      </div>
    </div>
  )
}

export default TabsDemo
