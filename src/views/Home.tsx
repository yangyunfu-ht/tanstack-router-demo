import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/contexts/useAuthContext'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const [count, setCount] = useState(0)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName || !password) return
    await auth.login({ userName, password })
  }

  const handleLogout = () => {
    auth.logout().finally(() => {
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
      <div className='mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100'>
        <h2 className='text-xl font-bold mb-4 text-gray-800'>用户认证</h2>

        {auth.isAuthenticated && auth.user ? (
          <div className='space-y-4'>
            <div className='p-4 bg-green-50 text-green-700 rounded-md border border-green-100 flex items-center gap-3'>
              <div className='w-2 h-2 rounded-full bg-green-500'></div>
              <div>
                <p className='text-sm text-green-600'>当前状态</p>
                <p className='font-semibold text-lg'>
                  已登录: {auth.user.name}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-sm cursor-pointer'
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
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                用户名
              </label>
              <input
                id='username'
                type='text'
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                placeholder='请输入用户名'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                密码
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                placeholder='请输入密码'
              />
            </div>
            <button
              type='submit'
              disabled={auth.isLoading}
              className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer'
            >
              {auth.isLoading ? '登录中...' : '登录'}
            </button>
          </form>
        )}
      </div>

      <div className='p-6 bg-white rounded-lg shadow-md border border-gray-100'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>
          Home Dashboard
        </h1>

        <div className='mb-6'>
          <button
            onClick={handleClick}
            className='px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 transition shadow-sm cursor-pointer'
          >
            Go to Dashboard settings
          </button>
        </div>

        <div className='flex items-center gap-4 mb-4'>
          <p className='text-lg font-medium text-gray-700'>
            Count: <span className='font-bold text-blue-600'>{count}</span>
          </p>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={handleIncrement}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition shadow-sm cursor-pointer'
          >
            Increment
          </button>
          <button
            onClick={handleDecrement}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition shadow-sm cursor-pointer'
          >
            Decrement
          </button>
          <button
            onClick={handleReset}
            className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition shadow-sm cursor-pointer'
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
