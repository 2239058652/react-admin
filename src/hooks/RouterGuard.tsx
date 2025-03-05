import { Suspense, useEffect } from 'react'
import { useRoutes, useLocation, useNavigate, matchPath } from 'react-router-dom'
import { Spin } from 'antd'
import useAuth from '@/hooks/useAuth'
import { findRouteByPath } from '@/utils/routerUtils'
import { checkPermission } from '@/utils/authUtils'
import routes from '@/router'
import { useTabs } from '@/contexts/TabsContext'

export const RouterGuard = () => {
  const outlet = useRoutes(routes)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { token, user, loading } = useAuth()
  const { addTab } = useTabs()

  useEffect(() => {
    const checkRouteAndPermission = async () => {
      if (loading) return
      const targetRoute = findRouteByPath(routes, pathname)
      const isLoginPage = pathname === '/login'

      if (!token) {
        return isLoginPage ? undefined : navigate('/login')
      }
      if (token && isLoginPage) {
        navigate('/', { replace: true })
        return
      }

      // 权限校验
      if (!checkPermission(targetRoute?.access, user?.roles)) {
        navigate('/403', { replace: true })
      }
      // 标签页逻辑
      if (targetRoute?.hideTab) return
      if (targetRoute?.name && !targetRoute.hideInMenu) {
        addTab({
          key: pathname,
          path: pathname,
          label: targetRoute.name
        })
      }
    }

    checkRouteAndPermission()
  }, [token, pathname, loading])

  // 增加加载状态提示
  return <Suspense fallback={<Spin fullscreen tip="Loading..." />}>{outlet}</Suspense>
}

export const UseRouterGuard = () => {
  const outlet = useRoutes(routes)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { token, user, loading } = useAuth()
  const { addTab } = useTabs()
  const WHITE_LIST = ['/login', '/relax', 'test']

  useEffect(() => {
    const checkRoute = async () => {
      if (loading) return

      const isInWhiteList = WHITE_LIST.some((path) => matchPath({ path, end: false }, pathname))
      if (isInWhiteList) {
        if (token && pathname === '/login') {
          navigate('/', { replace: true })
        }
        return
      }

      if (!token) {
        navigate('/login', { replace: true })
        return
      }

      const targetRoute = findRouteByPath(routes, pathname)
      // 权限校验
      if (!checkPermission(targetRoute?.access, user?.roles)) {
        navigate('/403', { replace: true })
      }

      if (targetRoute?.hideTab) return
      if (targetRoute?.name && !targetRoute.hideInMenu) {
        addTab({
          key: pathname,
          path: pathname,
          label: targetRoute.name
        })
      }
    }

    checkRoute()
  }, [token, pathname, loading, user?.roles, addTab])

  return <Suspense fallback={<Spin fullscreen tip="Loading..." />}>{outlet}</Suspense>
}
