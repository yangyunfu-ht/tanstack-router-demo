import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/useAuthStore'

const Home: React.FC = () => {
  const navigate = useNavigate()

  // 使用 Selector 优化性能：仅订阅需要的状态
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const user = useAuthStore(state => state.user)
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)
  const isLoading = useAuthStore(state => state.isLoading)

  const [count, setCount] = useState(0)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName || !password) return
    await login({ userName, password })
  }

  const handleLogout = () => {
    logout().finally(() => {
      setUserName('')
      setPassword('')
    })
  }

  const handleClick = () => {
    navigate({ to: '/dashboard/settings' })
  }

  const handleIncrement = () => {
    setCount(prev => prev + 1)
  }

  const handleDecrement = () => {
    setCount(prev => prev - 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <div className='p-4 max-w-2xl mx-auto'>
      <div className='mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-200'>
        <h2 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>
          用户认证
        </h2>

        {isAuthenticated && user ? (
          <div className='space-y-4'>
            <div className='p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md border border-green-100 dark:border-green-800 flex items-center gap-3'>
              <div className='w-2 h-2 rounded-full bg-green-500'></div>
              <div>
                <p className='text-sm text-green-600 dark:text-green-400'>
                  当前状态
                </p>
                <p className='font-semibold text-lg'>已登录: {user.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition shadow-sm cursor-pointer'
            >
              退出登录
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleLogin}
            className='space-y-4'
          >
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                用户名
              </label>
              <input
                id='username'
                type='text'
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                placeholder='请输入用户名'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                密码
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                placeholder='请输入密码'
              />
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition shadow-sm ${
                isLoading
                  ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed'
                  : 'bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 cursor-pointer'
              }`}
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </form>
        )}
      </div>

      <div className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-200'>
        <h2 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>
          计数器示例
        </h2>
        <div className='flex items-center gap-4 mb-4'>
          <button
            onClick={handleDecrement}
            className='w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer text-gray-700 dark:text-gray-200'
          >
            -
          </button>
          <span className='text-2xl font-bold w-12 text-center text-gray-900 dark:text-white'>
            {count}
          </span>
          <button
            onClick={handleIncrement}
            className='w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition cursor-pointer'
          >
            +
          </button>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={handleReset}
            className='px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 underline cursor-pointer'
          >
            重置
          </button>
          <button
            onClick={handleClick}
            className='px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md hover:bg-gray-900 dark:hover:bg-gray-600 transition shadow-sm cursor-pointer'
          >
            前往设置页
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
