import { RouteObject } from 'react-router-dom'

type CustomRoute = RouteObject & {
  name?: string
  icon?: React.ReactNode
  hideInMenu?: boolean
  children?: CustomRoute[]
  access?: string[]
}

/**
 * 根据路径查找路由配置（递归实现）
 * @param routes 路由配置数组
 * @param targetPath 要查找的目标路径
 * @param parentPath 父级路径（用于递归处理嵌套路由）
 */
export const findRouteByPath = (
  routes: CustomRoute[],
  targetPath: string,
  parentPath: string = ''
): CustomRoute | undefined => {
  // 标准化路径：移除开头和结尾的斜杠
  const normalizePath = (path: string) => path.replace(/^\/+|\/+$/g, '')

  // 当前处理的路径
  const currentPath = normalizePath(targetPath)
  const currentParent = normalizePath(parentPath)

  for (const route of routes) {
    // 处理路由路径
    const routePath = route.path ? normalizePath(route.path) : ''
    const fullPath = currentParent ? `${currentParent}/${routePath}` : routePath

    // 精确匹配
    if (fullPath === currentPath) return route

    // 处理动态参数路由（如 /user/:id）
    if (routePath?.includes(':') && routePath.split('/').length === currentPath.split('/').length) {
      const pattern = new RegExp(`^${routePath.replace(/:\w+/g, '([^/]+)')}$`)
      if (pattern.test(currentPath)) return route
    }

    // 递归处理子路由
    if (route.children) {
      const found = findRouteByPath(
        route.children,
        targetPath,
        fullPath // 传递当前完整路径作为父级
      )
      if (found) return found
    }
  }

  return undefined
}
