import { RouteObject } from 'react-router-dom'

type CustomRoute = RouteObject & {
  name?: string
  icon?: React.ReactNode
  hideInMenu?: boolean
  children?: CustomRoute[]
  access?: string[]
  hideTab?: boolean
}

/**
 * 根据路径查找路由配置（递归实现）
 * @param routes 路由配置数组
 * @param targetPath 要查找的目标路径
 * @param parentPath 父级路径（用于递归处理嵌套路由）
 */
// 更新 utils/routerUtils.ts 中的 findRouteByPath
export const findRouteByPath = (routes: CustomRoute[], targetPath: string) => {
  // 添加对嵌套路由的完整路径匹配
  const normalizePath = (path: string) => path.replace(/\/+/g, '/').replace(/\/$/, '')
  const currentPath = normalizePath(targetPath)

  const searchRoutes = (routes: CustomRoute[], parentPath = ''): CustomRoute | undefined => {
    for (const route of routes) {
      const fullPath = normalizePath(`${parentPath}/${route.path || ''}`)

      if (fullPath === currentPath) return route
      if (route.children) {
        const found = searchRoutes(route.children, fullPath)
        if (found) return found
      }
    }
  }

  return searchRoutes(routes)
}
