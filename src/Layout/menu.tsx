import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { RouteObject } from 'react-router-dom'
import routes from '@/router'
import useAuth from '@/hooks/useAuth'
import { checkPermission } from '@/utils/authUtils'
import { useEffect, useMemo } from 'react'
import { useSettings } from '@/contexts/SettingsContext'

// 假设你的路由类型定义如下（根据实际路由配置调整）
type CustomRoute = RouteObject & {
  name?: string
  icon?: React.ReactNode
  hideInMenu?: boolean
  children?: CustomRoute[]
  access?: string[]
  hideTab?: boolean
}

function generateMenuItems(routes: CustomRoute[], userRoles: string[], parentPath = ''): MenuProps['items'] {
  return routes
    .filter((route) => {
      if (route.hideInMenu || !route.name) return false
      return checkPermission(route.access, userRoles)
    })
    .map((route) => {
      const fullPath = [parentPath, route.path]
        .join('/')
        .replace(/\/+/g, '/') // 处理多个斜杠
        .replace(/\/$/, '') // 移除尾部斜杠

      const menuItem: any = {
        key: fullPath,
        label: route.children ? <span>{route.name}</span> : <Link to={fullPath}>{route.name}</Link>,
        icon: route.icon
      }

      // 递归处理子路由
      if (route.children) {
        menuItem.children = generateMenuItems(route.children, userRoles, fullPath)
        // 如果子菜单无有效项则过滤掉空菜单
        if (!menuItem.children || menuItem.children.length === 0) return null
      }

      return menuItem
    })
    .filter(Boolean) as MenuProps['items'] // 过滤掉null项
}

function LayoutMenu() {
  const location = useLocation()
  const { user, logout } = useAuth() // 从全局状态获取用户信息
  const { settings } = useSettings()

  const normalizedPath = useMemo(() => {
    return location.pathname.replace(/\/+$/, '').split('?')[0]
  }, [location.pathname])
  // 生成带权限过滤的菜单项

  const menuItems = useMemo(() => generateMenuItems(routes[0].children || [], user?.roles || []), [routes, user?.roles])

  return <Menu theme="light" mode="inline" selectedKeys={[normalizedPath]} items={menuItems} />
}
export default LayoutMenu
