import { lazy } from 'react'

export const UseLazyLoad = (compotPath: string, viewPath?: string) => {
  if (!viewPath) viewPath = 'index'
  const LazyComponent = lazy(() => import(`../views/${compotPath}/${viewPath}`))
  return <LazyComponent />
}
