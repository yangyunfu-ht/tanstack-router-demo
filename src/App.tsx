import React, { useEffect } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes'
import { useAuth } from '@/contexts/rootRoute'
import { AuthProvider } from '@/providers/auth'

const InnerApp: React.FC = () => {
  const auth = useAuth()

  useEffect(() => {
    auth.login({ password: '1', userName: 'John Doe' })
  }, [auth])

  return (
    <RouterProvider
      router={router}
      context={auth}
    />
  )
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

export default App
