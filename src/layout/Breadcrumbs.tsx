import { Link, useMatches } from '@tanstack/react-router'

export function Breadcrumbs() {
  // 1. 获取当前所有匹配的路由层级
  const matches = useMatches()

  // 2. 过滤掉没有定义标题的路由（比如无路径路由中间件或根路由）
  const breadcrumbs = matches
    .filter(match => match.staticData?.title)
    .map(match => ({
      title: match.staticData!.title,
      path: match.fullPath,
      icon: match.staticData.icon,
    }))

  if (breadcrumbs.length === 0) return null

  return (
    <nav
      aria-label='Breadcrumb'
      className='flex mb-4 text-sm text-gray-600'
    >
      <ol className='flex list-none p-0'>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li
              key={crumb.path}
              className='flex items-center'
            >
              {isLast ? (
                // 最后一级：当前页面，不加链接，加粗显示
                <span className='font-bold text-gray-900'>{crumb.title}</span>
              ) : (
                // 非最后一级：可点击的链接
                <>
                  <Link
                    to={crumb.path}
                    className='hover:text-blue-600 transition-colors'
                  >
                    {crumb.title}
                  </Link>
                  {/* 分隔符 */}
                  <span className='mx-2 text-gray-400'>/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
