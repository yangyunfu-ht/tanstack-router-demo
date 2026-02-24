import React, { useState } from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useThemeStore } from '@/stores/useThemeStore'

const MainLayout: React.FC = () => {
  // 控制移动端侧边栏状态
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useThemeStore()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200'>
      {/* --- 顶部导航 (Header) --- */}
      <header className='sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm transition-colors duration-200'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          {/* 左侧：Logo + 手机端汉堡按钮 */}
          <div className='flex items-center gap-3'>
            {/* 汉堡按钮：仅在 md 以下显示 */}
            <button
              onClick={toggleSidebar}
              className='md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer text-gray-600 dark:text-gray-300'
              aria-label='Toggle Menu'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d={
                    isSidebarOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>

            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold'>
                T
              </div>
              <span className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                AppDev
              </span>
            </div>
          </div>

          {/* 右侧：主题切换 + 桌面端导航 */}
          <div className='flex items-center gap-4'>
            {/* 主题切换按钮 */}
            <button
              onClick={toggleTheme}
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors'
              aria-label='Toggle Theme'
            >
              {theme === 'light' ? (
                // 月亮图标 (切换到暗色)
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
              ) : (
                // 太阳图标 (切换到亮色)
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                </svg>
              )}
            </button>

            {/* 桌面端导航 */}
            <nav className='hidden md:flex items-center gap-6 text-sm font-medium'>
              <Link
                to='/'
                className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors [&.active]:text-blue-600 dark:[&.active]:text-blue-400'
              >
                首页
              </Link>
              <Link
                to='/about'
                className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors [&.active]:text-blue-600 dark:[&.active]:text-blue-400'
              >
                关于
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* --- 主体内容区域 --- */}
      <div className='flex-1 flex max-w-7xl w-full mx-auto p-4 gap-6 relative'>
        {/* --- 侧边栏 (Aside) --- */}
        {/* 遮罩层：手机端打开时显示 */}
        {isSidebarOpen && (
          <div
            className='fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm'
            onClick={closeSidebar}
          />
        )}

        {/* 侧边栏容器 */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 p-4 transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700
          md:relative md:translate-x-0 md:z-auto md:bg-transparent md:border-none md:p-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        >
          <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between md:hidden mb-6'>
              <span className='font-bold text-gray-900 dark:text-white'>
                菜单
              </span>
              <button
                onClick={closeSidebar}
                className='p-2 cursor-pointer text-gray-600 dark:text-gray-300'
              >
                ✕
              </button>
            </div>

            <nav className='bg-white dark:bg-gray-800 md:bg-white md:dark:bg-gray-800 rounded-xl md:border border-gray-200 dark:border-gray-700 p-2 shadow-sm space-y-1 h-full transition-colors duration-200'>
              <p className='px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider'>
                控制面板
              </p>
              {/* 点击链接后自动关闭侧边栏（移动端体验更好） */}
              <Link
                to='/'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                📊首页
              </Link>
              <Link
                to='/about'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                👤 关于
              </Link>
              <Link
                to='/data'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                📊 数据
              </Link>
              <Link
                to='/upload'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                📤 Upload
              </Link>
              <Link
                to='/tree'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                🌳 Tree
              </Link>
              <Link
                to='/button'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                🔘 Button
              </Link>
              <Link
                to='/ag-grid'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                🧮 AG Grid
              </Link>
              <Link
                to='/skeleton'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                💀 Skeleton
              </Link>
              <Link
                to='/timeline'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                📅 Timeline
              </Link>
              <Link
                to='/tabs'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                📑 Tabs
              </Link>
              <Link
                to='/dashboard'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400 transition-colors'
              >
                📊 仪表盘
              </Link>
            </nav>
          </div>
        </aside>

        {/* --- 核心内容 (Main) --- */}
        <main className='flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm min-w-0 z-0 transition-colors duration-200'>
          <Outlet />
          <TanStackRouterDevtools initialIsOpen={false} /> {/* 路由调试工具 */}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
