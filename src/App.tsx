import { Suspense, useEffect } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import router from '@/router'
import { Spin } from 'antd'
import { AuthProvider } from './hooks/AuthContext'
import useAuth from './hooks/useAuth'
import { findRouteByPath } from '@/utils/routerUtils'
import { checkPermission } from '@/utils/authUtils'

function RouterGuard() {
  const outlet = useRoutes(router)
  const { pathname } = useLocation()
  const location = useLocation()
  const navigate = useNavigate()
  const { token, user } = useAuth()

  useEffect(() => {
    const checkRouteAndPermission = async () => {
      const targetRoute = findRouteByPath(router, pathname)
      const isLoginPage = pathname === '/login'

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
  return <Suspense fallback={<Spin fullscreen tip="Loading..." />}>{outlet}</Suspense>
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterGuard />
      </AuthProvider>
    </div>
  )
}

export default App
