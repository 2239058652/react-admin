/**
 * 根据路径查找路由配置（递归实现）
 * @param routes 路由配置数组
 * @param targetPath 要查找的目标路径
 * @param parentPath 父级路径（用于递归处理嵌套路由）
 */

// utils/routerUtils.ts
export const findRouteByPath = (routes: CustomRoute[], targetPath: string) => {
  const normalizePath = (path: string) => {
    return path.replace(/\/+$/, '').split('?')[0].replace(/\/+/g, '/')
  }

  const searchRoutes = (routes: CustomRoute[], parentPath = ''): CustomRoute | undefined => {
    for (const route of routes) {
      const routePath = route.path ? normalizePath(route.path) : ''
      const fullPath = normalizePath(`${parentPath}/${routePath}`)

      // 精确匹配
      if (fullPath === normalizePath(targetPath)) return route

      // 处理动态路由 (如 /user/:id)
      if (routePath?.includes(':')) {
        const pattern = new RegExp(`^${routePath.replace(/:\w+/g, '([^/]+)')}$`)
        if (pattern.test(normalizePath(targetPath))) return route
      }

      // 递归子路由
      if (route.children) {
        const found = searchRoutes(route.children, fullPath)
        if (found) return found
      }
    }
  }

  return searchRoutes(routes)
}
