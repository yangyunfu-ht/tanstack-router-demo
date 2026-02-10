import React from 'react'
import { Outlet, Link } from '@tanstack/react-router'

const Dashboard: React.FC = () => {
  return (
    <div className='p-4 bg-gray-100'>
      <h2>控制面板侧边栏</h2>
      <div className='flex gap-4'>
        <Link to='/dashboard'>概览</Link> |
        <Link to='/dashboard/settings'>设置</Link>
      </div>
      <div className='bg-white p-4 mt-4'>
        <Outlet /> {/* 渲染三级路由 */}
      </div>
    </div>
  )
}

export default Dashboard
