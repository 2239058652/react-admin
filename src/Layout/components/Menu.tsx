import { ConfigProvider, Menu, Spin } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'
import routes from '@/router'
import useAuth from '@/hooks/useAuth'
import { checkPermission } from '@/utils/authUtils'
import { useCallback, useMemo } from 'react'
// import { useSettings } from '@/contexts/SettingsContext'

// 假设你的路由类型定义如下（根据实际路由配置调整）

function LayoutMenu() {
  const location = useLocation()
  const { user, loading } = useAuth() // 从全局状态获取用户信息
  // const { settings } = useSettings()

  // 生成菜单项
  const generateMenuItems = useCallback(
    (routes: CustomRoute[], userRoles: string[], parentPath = ''): MenuProps['items'] => {
      return routes
        .filter((route) => {
          if (route.hideInMenu || !route.name) return false
          return checkPermission(route.access, userRoles)
        })
        .map((route) => {
          const fullPath = [parentPath, route.path].join('/').replace(/\/+/g, '/').replace(/\/$/, '')

          const menuItem: MenuProps['items'] | Record<string, any> = {
            key: fullPath,
            label: route.children ? <span>{route.name}</span> : <Link to={fullPath}>{route.name}</Link>,
            icon: route.icon
          }

          // 递归处理子路由
          if (route.children) {
            menuItem.children = generateMenuItems(route.children, userRoles, fullPath)
            if (!menuItem.children || menuItem.children.length === 0) return null
          }

          return menuItem
        })
        .filter(Boolean) as MenuProps['items']
    },
    []
  )

  const normalizedPath = useMemo(() => {
    return location.pathname.replace(/\/+$/, '').split('?')[0]
  }, [location.pathname])

  // 生成带权限过滤的菜单项
  const menuItems = useMemo(
    () => (user ? generateMenuItems(routes[0].children || [], user?.roles || []) : []),
    [routes, user?.roles, generateMenuItems, user]
  )

  if (loading || !user) return <Spin fullscreen />

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHeight: 45,
            itemSelectedBg: '#ebebeb',
            itemSelectedColor: '#165DFF'
          }
        }
      }}
    >
      <Menu theme="light" mode="inline" selectedKeys={[normalizedPath]} items={menuItems} />
    </ConfigProvider>
  )
}
export default LayoutMenu
