import React, { useState } from 'react'
import { Link, Outlet } from '@tanstack/react-router'

const MainLayout: React.FC = () => {
  // 控制移动端侧边栏状态
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900'>
      {/* --- 顶部导航 (Header) --- */}
      <header className='sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 shadow-sm'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          {/* 左侧：Logo + 手机端汉堡按钮 */}
          <div className='flex items-center gap-3'>
            {/* 汉堡按钮：仅在 md 以下显示 */}
            <button
              onClick={toggleSidebar}
              className='md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer'
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
              <span className='text-xl font-bold tracking-tight'>AppDev</span>
            </div>
          </div>

          {/* 桌面端导航 */}
          <nav className='hidden md:flex items-center gap-6 text-sm font-medium'>
            <Link
              to='/'
              className='hover:text-blue-600 transition-colors [&.active]:text-blue-600'
            >
              首页
            </Link>
            <Link
              to='/about'
              className='hover:text-blue-600 transition-colors [&.active]:text-blue-600'
            >
              关于
            </Link>
          </nav>
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
          fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 transform transition-transform duration-300 ease-in-out border-r border-gray-200
          md:relative md:translate-x-0 md:z-auto md:bg-transparent md:border-none md:p-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        >
          <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between md:hidden mb-6'>
              <span className='font-bold'>菜单</span>
              <button
                onClick={closeSidebar}
                className='p-2 cursor-pointer'
              >
                ✕
              </button>
            </div>

            <nav className='bg-white md:bg-white rounded-xl md:border border-gray-200 p-2 shadow-sm space-y-1 h-full'>
              <p className='px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                控制面板
              </p>
              {/* 点击链接后自动关闭侧边栏（移动端体验更好） */}
              <Link
                to='/'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg hover:bg-gray-100 [&.active]:bg-blue-50 [&.active]:text-blue-600 transition-colors'
              >
                📊首页
              </Link>
              <Link
                to='/about'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg hover:bg-gray-100 [&.active]:bg-blue-50 [&.active]:text-blue-600 transition-colors'
              >
                👤 关于
              </Link>
              <Link
                to='/data'
                onClick={closeSidebar}
                className='block px-3 py-2 rounded-lg hover:bg-gray-100 [&.active]:bg-blue-50 [&.active]:text-blue-600 transition-colors'
              >
                📊 数据
              </Link>
            </nav>
          </div>
        </aside>

        {/* --- 核心内容 (Main) --- */}
        <main className='flex-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm min-w-0 z-0'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
