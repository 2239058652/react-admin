import { Suspense, useEffect } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import router from '@/router'
import { Spin } from 'antd'
import { AuthProvider } from './hooks/AuthContext'
import useAuth from './hooks/useAuth'
import { findRouteByPath } from '@/utils/routerUtils'
import { checkPermission } from '@/utils/authUtils'
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext'
import { TabsProvider, useTabs } from '@/contexts/TabsContext'

function RouterGuard() {
  const outlet = useRoutes(router)
  const { pathname } = useLocation()
  const location = useLocation()
  const navigate = useNavigate()
  const { token, user } = useAuth()
  const { addTab } = useTabs()
  const { settings } = useSettings()

  useEffect(() => {
    const checkRouteAndPermission = async () => {
      const targetRoute = findRouteByPath(router, pathname)
      const isLoginPage = pathname === '/login'
      // 标签页逻辑
      if (targetRoute?.hideTab) return
      if (targetRoute?.name && !targetRoute.hideInMenu) {
        addTab({
          key: pathname,
          path: pathname,
          label: targetRoute.name
        })
      }

      // 路由不存在时跳转404
      if (!targetRoute) {
        navigate('/404', { replace: true })
        return
      }

      if (!token) {
        return isLoginPage ? undefined : navigate('/login')
      }
      if (token && isLoginPage) {
        navigate('/', { replace: true })
        return
      }

      // 权限校验
      if (!checkPermission(targetRoute.access, user?.roles)) {
        navigate('/403', { replace: true })
      }
    }

    checkRouteAndPermission()
  }, [token, pathname])

  // 增加加载状态提示
  return (
    <Suspense fallback={<Spin fullscreen tip="Loading..." />}>
      <div style={{ margin: settings.compactMode ? '8px' : '16px' }}>{outlet}</div>
    </Suspense>
  )
}

function App() {
  return (
    <div className="App">
      <SettingsProvider>
        <TabsProvider>
          <AuthProvider>
            <RouterGuard />
          </AuthProvider>
        </TabsProvider>
      </SettingsProvider>
    </div>
  )
}

export default App
