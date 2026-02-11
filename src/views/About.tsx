import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/useAuthStore'
import { fetchPosts } from '@/api/posts'

const About: React.FC = () => {
  const user = useAuthStore(state => state.user)

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        About Page (User: {user?.name || 'Guest'})
      </h1>

      <div className='mb-6 p-4 bg-blue-50 rounded-lg'>
        <h2 className='text-xl font-semibold mb-2'>TanStack Query Demo</h2>
        <p className='text-gray-600 mb-4'>
          Fetching data from jsonplaceholder...
        </p>

        {isLoading && (
          <div className='flex items-center text-blue-600'>
            <svg
              className='animate-spin h-5 w-5 mr-3'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            Loading posts...
          </div>
        )}

        {isError && (
          <div className='p-4 bg-red-100 text-red-700 rounded-md'>
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        )}

        {posts && (
          <div className='space-y-4'>
            <button
              onClick={() => refetch()}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
            >
              Refetch Data
            </button>
            <div className='grid gap-4'>
              {posts.map(post => (
                <div
                  key={post.id}
                  className='bg-white p-4 rounded shadow-sm border border-gray-100'
                >
                  <h3 className='font-bold text-lg mb-2'>{post.title}</h3>
                  <p className='text-gray-600'>{post.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default About
