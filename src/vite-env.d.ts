import { router } from '@router/index'

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
  interface StaticDataRouteOption {
    title?: string
    icon?: string
  }
}
