/// <reference types="vite/client" />
import { router } from '@/routes/index'

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
  interface StaticDataRouteOption {
    title?: string
    icon?: string
  }
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_APP_NAME: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
