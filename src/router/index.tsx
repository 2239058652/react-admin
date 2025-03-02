import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '@/Layout' // 假设你的布局组件路径
import { MailOutlined } from '@ant-design/icons'
import { withAuth } from '@/hooks/withAuth'

// 使用React.lazy实现动态加载
const Login = lazy(() => import('@/views/Login'))
const Home = lazy(() => import('@/views/Home'))
const Dashboard = withAuth(lazy(() => import('@/views/Dashboard')))
const Error403 = lazy(() => import('@/views/Error/403'))
const Error404 = lazy(() => import('@/views/Error/404'))

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
        hideInMenu: true
      },
      {
        name: '仪表盘',
        icon: <MailOutlined />,
        path: 'home',
        element: <Dashboard />
      },
      {
        path: 'dashboards',
        name: '菜单管理',
        icon: <MailOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to="analysis" replace />,
            hideInMenu: true
          },
          {
            path: 'analysis',
            name: '数据分析',
            element: <Home />
          },
          {
            path: 'monitor',
            name: '实时监控',
            element: <Dashboard />,
            access: ['admin']
          }
        ]
      }
    ]
  },
  {
    name: '登录',
    path: '/login',
    hideInMenu: true,
    hideTab: true,
    element: <Login />
  },
  {
    name: '403',
    path: '/403',
    hideInMenu: true,
    hideTab: true,
    element: <Error403 />
  },
  {
    name: '404',
    path: '/404',
    hideInMenu: true,
    hideTab: true,
    element: <Error404 />
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    hideTab: true,
    element: <Navigate to="/404" replace />
  }
]

export default routes
