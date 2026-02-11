import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  permissions: string[]
}

export interface UserData {
  userName: string
  password: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  logout: () => Promise<void>
  login: (userData: UserData) => Promise<void>
  isLoading: boolean
  token: string | null
  refreshToken: string | null
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      login: async (userData: UserData) => {
        set({ isLoading: true })
        try {
          const { isAuthenticated, user, token, refreshToken } = await Promise.resolve({
            isAuthenticated: true,
            user: {
              id: '1',
              name: userData.userName,
              permissions: ['read', 'write'],
            },
            token: 'fake-jwt-token',
            refreshToken: 'fake-refresh-token',
          })

          set({
            isAuthenticated,
            user,
            token,
            refreshToken,
          })
        } catch (error) {
          console.error('Login failed:', error)
        } finally {
          set({ isLoading: false })
        }
      },
      logout: async () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          refreshToken: null,
        })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isLoading: state.isLoading,
      }),
    }
  )
)
