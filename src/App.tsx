import React from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { router } from './routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { useShallow } from 'zustand/react/shallow'

const queryClient = new QueryClient()

const InnerApp: React.FC = () => {
  // 使用 useShallow 进行性能优化，只订阅路由需要的状态
  const auth = useAuthStore(
    useShallow(state => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
    }))
  )

  return (
    <RouterProvider
      router={router}
      context={auth}
    />
  )
}

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
