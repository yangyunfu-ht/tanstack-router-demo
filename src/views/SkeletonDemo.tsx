import React, { useState, useEffect } from 'react'
import { Skeleton } from '@/components/Skeleton'

const SkeletonDemo: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleReload = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Skeleton 骨架屏示例
        </h1>
        <button
          onClick={handleReload}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          重新加载
        </button>
      </div>

      <div className='space-y-8'>
        {/* 基础用法 */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
            基础变体 (Variants)
          </h2>
          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <span className='w-24 text-sm text-gray-500'>Text:</span>
              <Skeleton
                variant='text'
                width={200}
              />
            </div>
            <div className='flex items-center gap-4'>
              <span className='w-24 text-sm text-gray-500'>Circular:</span>
              <Skeleton
                variant='circular'
                width={40}
                height={40}
              />
            </div>
            <div className='flex items-center gap-4'>
              <span className='w-24 text-sm text-gray-500'>Rounded:</span>
              <Skeleton
                variant='rounded'
                width={200}
                height={60}
              />
            </div>
            <div className='flex items-center gap-4'>
              <span className='w-24 text-sm text-gray-500'>Rectangular:</span>
              <Skeleton
                variant='rectangular'
                width={200}
                height={60}
              />
            </div>
          </div>
        </section>

        {/* 复杂卡片示例 */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
            卡片加载示例
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3].map(item => (
              <div
                key={item}
                className='border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-4'
              >
                {loading ? (
                  <>
                    <div className='flex items-center gap-4'>
                      <Skeleton
                        variant='circular'
                        width={48}
                        height={48}
                      />
                      <div className='space-y-2'>
                        <Skeleton
                          variant='text'
                          width={120}
                        />
                        <Skeleton
                          variant='text'
                          width={80}
                        />
                      </div>
                    </div>
                    <Skeleton
                      variant='rounded'
                      height={160}
                      className='w-full'
                    />
                    <div className='space-y-2'>
                      <Skeleton variant='text' />
                      <Skeleton variant='text' />
                      <Skeleton
                        variant='text'
                        width='80%'
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='flex items-center gap-4'>
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item}`}
                        alt='Avatar'
                        className='w-12 h-12 rounded-full bg-gray-100'
                      />
                      <div>
                        <h3 className='font-semibold text-gray-900 dark:text-white'>
                          User Name {item}
                        </h3>
                        <p className='text-sm text-gray-500'>
                          Posted 2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className='h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-400'>
                      Image Placeholder
                    </div>
                    <div className='space-y-1'>
                      <p className='text-gray-600 dark:text-gray-300'>
                        This is a sample card content that appears after the
                        loading state is finished. It demonstrates how the
                        skeleton screens mimic the final content layout.
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 列表加载示例 */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
            列表加载示例
          </h2>
          <div className='space-y-4'>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-4'
                  >
                    <Skeleton
                      variant='rectangular'
                      width={60}
                      height={60}
                      className='rounded-md'
                    />
                    <div className='flex-1 space-y-2'>
                      <Skeleton
                        variant='text'
                        width='60%'
                      />
                      <Skeleton
                        variant='text'
                        width='40%'
                      />
                    </div>
                  </div>
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-4'
                  >
                    <div className='w-[60px] h-[60px] bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold'>
                      {index + 1}
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-medium text-gray-900 dark:text-white'>
                        List Item Title {index + 1}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        Description for list item {index + 1}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default SkeletonDemo
