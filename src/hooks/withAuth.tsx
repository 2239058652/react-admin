import { findRouteByPath } from '@/utils/routerUtils'
import { checkPermission } from '@/utils/authUtils'
import useAuth from '@/hooks/useAuth'
import { useLocation, Navigate } from 'react-router-dom'
import routes from '@/router'

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthWrapper: React.FC<P> = (props) => {
    const { user } = useAuth()
    const location = useLocation()
    const route = findRouteByPath(routes, location.pathname)

    // 当路由需要权限且用户无权限时跳转403
    if (route?.access && !checkPermission(route.access, user?.roles)) {
      return <Navigate to="/403" replace />
    }

    return <WrappedComponent {...props} />
  }

  return AuthWrapper
}
