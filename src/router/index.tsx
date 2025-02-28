import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '@/Layout' // 假设你的布局组件路径
import { MailOutlined } from '@ant-design/icons'

// 使用React.lazy实现动态加载
const Login = lazy(() => import('@/views/Login'))
const Home = lazy(() => import('@/views/Home'))
const Dashboard = lazy(() => import('@/views/Dashboard'))

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        name: '仪表盘',
        icon: <MailOutlined />,
        path: 'home',
        element: <Home />
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
            access: ['user', 'admin'],
            element: <Dashboard />
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
]

export default routes
