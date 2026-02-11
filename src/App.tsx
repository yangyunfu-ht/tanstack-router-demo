import React from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { router } from './routes'
import { useAuth } from '@/contexts/useAuthContext'
import { AuthProvider } from '@/providers/useAuthProvider'

const queryClient = new QueryClient()

const InnerApp: React.FC = () => {
  const auth = useAuth()

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
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
