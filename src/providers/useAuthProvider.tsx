import React from 'react'
import { AuthContext } from '@/contexts/useAuthContext'
import { useAuthStore } from '@/stores/useAuthStore'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuthStore()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
