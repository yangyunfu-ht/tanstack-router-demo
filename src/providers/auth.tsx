import React, { useCallback, useState } from 'react'
import { AuthContext, type User, type UserData } from '@/contexts/rootRoute'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (userData: UserData) => {
    setIsLoading(true)
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        setIsAuthenticated(true)
        setUser({
          id: '1',
          name: userData.userName,
          permissions: ['read', 'write'],
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
