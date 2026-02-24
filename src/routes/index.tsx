import { useAuthStore, type User } from '@/stores/useAuthStore'
import {
  createRouter,
  createRoute,
  createRootRouteWithContext,
  lazyRouteComponent,
  redirect,
} from '@tanstack/react-router'

interface RouterContext {
  isAuthenticated: boolean
  user: User | null
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: lazyRouteComponent(() => import('@/layout/DefaultLayout')),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  staticData: {
    title: '首页',
    icon: 'home',
  },
  component: lazyRouteComponent(() => import('@/views/Home')),
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'about',
  staticData: {
    title: '关于我们',
    icon: 'info',
  },
  component: lazyRouteComponent(() => import('@/views/About')),
})

export const userDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'users/$userId',
  loader: ({ params }) => {
    console.log(params)
  },
  component: lazyRouteComponent(() => import('@/views/UserDetail')),
})

// 二级路由
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dashboard', // 浏览器路径为 /dashboard
  staticData: {
    title: '控制面板',
    icon: 'dashboard',
  },
  component: lazyRouteComponent(() => import('@/views/Dashboard')),
})

// 三级路由
const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/', // 对应路径 /dashboard/
  staticData: {
    title: '仪表盘首页',
    icon: 'overview',
  },
  component: lazyRouteComponent(() => import('@/views/DashboardIndex')),
})

const dashboardSettingsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'settings', // 对应路径 /dashboard/settings
  staticData: {
    title: '仪表盘设置',
    icon: 'settings',
  },
  component: lazyRouteComponent(() => import('@/views/DashboardSetting')),
})

const dataRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'data',
  staticData: {
    title: '数据',
    icon: 'data',
  },
  component: lazyRouteComponent(() => import('@/views/Data')),
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/',
        search: { redirectTo: location.href },
      })
    }
    if (!context.user?.permissions.includes('read')) {
      throw redirect({
        to: '/no-auth',
        search: { redirectTo: location.href },
      })
    }
  },
})

const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'upload',
  staticData: {
    title: '大文件上传',
    icon: 'upload',
  },
  component: lazyRouteComponent(() => import('@/views/Upload')),
})

const treeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'tree',
  staticData: {
    title: '树形选择',
    icon: 'tree',
  },
  component: lazyRouteComponent(() => import('@/views/TreeDemo')),
})

const buttonDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'button',
  staticData: {
    title: 'Button 组件',
    icon: 'button',
  },
  component: lazyRouteComponent(() => import('@/views/ButtonDemo')),
})

const agGridDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'ag-grid',
  staticData: {
    title: 'AG Grid 组件',
    icon: 'table',
  },
  component: lazyRouteComponent(() => import('@/views/AgGridDemo')),
})

const skeletonDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'skeleton',
  staticData: {
    title: 'Skeleton 组件',
    icon: 'loader',
  },
  component: lazyRouteComponent(() => import('@/views/SkeletonDemo')),
})

const timelineDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'timeline',
  staticData: {
    title: 'Timeline 组件',
    icon: 'list-video',
  },
  component: lazyRouteComponent(() => import('@/views/TimelineDemo')),
})

const tabsDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'tabs',
  staticData: {
    title: 'Tabs 组件',
    icon: 'folder',
  },
  component: lazyRouteComponent(() => import('@/views/TabsDemo')),
})

const noAuthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'no-auth',
  staticData: {
    title: '无权限',
    icon: 'no-auth',
  },
  component: lazyRouteComponent(() => import('@/views/NoAuth')),
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  userDetailRoute,
  dashboardRoute.addChildren([dashboardIndexRoute, dashboardSettingsRoute]),
  dataRoute,
  uploadRoute,
  treeRoute,
  buttonDemoRoute,
  agGridDemoRoute,
  skeletonDemoRoute,
  timelineDemoRoute,
  tabsDemoRoute,
  noAuthRoute,
])

export const router = createRouter({
  routeTree,
  context: {
    isAuthenticated: useAuthStore.getState().isAuthenticated,
    user: useAuthStore.getState().user,
  },
  defaultNotFoundComponent: () => <div>默认 404 页面</div>,
  defaultOnCatch(error, errorInfo) {
    console.error('路由错误:', error, errorInfo)
  },
})
