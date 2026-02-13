import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: 'light',
      toggleTheme: () =>
        set(state => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light'
          updateDocumentClass(newTheme)
          return { theme: newTheme }
        }),
      setTheme: theme => {
        updateDocumentClass(theme)
        set({ theme })
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => state => {
        if (state) {
          updateDocumentClass(state.theme)
        }
      },
    }
  )
)

function updateDocumentClass(theme: Theme) {
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
}
