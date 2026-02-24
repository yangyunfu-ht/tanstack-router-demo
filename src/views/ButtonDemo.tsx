import React from 'react'
import { Button } from '../components/Button'

const ButtonDemo: React.FC = () => {
  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8 text-gray-900 dark:text-white'>
        Button 组件示例
      </h1>

      <div className='space-y-8'>
        {/* Variants */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
            变体 (Variants)
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button variant='primary'>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='danger'>Danger</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='outline'>Outline</Button>
          </div>
        </section>

        {/* Sizes */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
            尺寸 (Sizes)
          </h2>
          <div className='flex flex-wrap items-center gap-4'>
            <Button size='sm'>Small</Button>
            <Button size='md'>Medium</Button>
            <Button size='lg'>Large</Button>
          </div>
        </section>

        {/* States */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
            状态 (States)
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
            <Button
              isLoading
              variant='secondary'
            >
              Processing
            </Button>
          </div>
        </section>

        {/* With Icons */}
        <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
            带图标 (With Icons)
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button
              leftIcon={
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
              }
            >
              Add New
            </Button>
            <Button
              variant='outline'
              rightIcon={
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              }
            >
              Next Step
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ButtonDemo
