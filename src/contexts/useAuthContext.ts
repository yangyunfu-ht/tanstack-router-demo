import React, { createContext } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'

export type useAuthContext = ReturnType<typeof useAuthStore.getState>

export const AuthContext = createContext<useAuthContext | null>(null)

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an useAuthProvider')
  }
  return context
}
