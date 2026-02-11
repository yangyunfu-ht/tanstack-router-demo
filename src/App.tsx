import React from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes'
import { useAuth } from '@/contexts/useAuthContext'
import { AuthProvider } from '@/providers/useAuthProvider'

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
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

export default App
