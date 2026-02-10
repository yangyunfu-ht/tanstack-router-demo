import React, { createContext } from 'react'

export interface User {
  id: string
  name: string
  permissions: string[]
}

export interface UserData {
  userName: string
  password: string
}

export type RootRouteContext = {
  isAuthenticated: boolean
  user: User | null
  logout: () => void
  login: (userData: UserData) => Promise<void>
  isLoading?: boolean
  token?: string
  refreshToken?: string
}

export const AuthContext = createContext<RootRouteContext | null>(null)

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
