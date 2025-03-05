import { Navigate } from 'react-router-dom'
import Layout from '@/Layout'
import { MailOutlined } from '@ant-design/icons'
import { UseLazyLoad } from '@/hooks/useLazyLoad'

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
        element: UseLazyLoad('Dashboard')
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
            element: UseLazyLoad('Home')
          },
          {
            path: 'monitor',
            name: '实时监控',
            element: UseLazyLoad('Dashboard'),
            access: ['admin', 'user']
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
    element: UseLazyLoad('Login')
  },
  {
    name: 'Relax',
    path: '/relax',
    hideInMenu: true,
    hideTab: true,
    element: UseLazyLoad('Relax')
  },
  {
    name: '测试',
    path: '/test',
    hideInMenu: true,
    hideTab: true,
    element: UseLazyLoad('HandleTest')
  },
  {
    name: '403',
    path: '/403',
    hideInMenu: true,
    hideTab: true,
    element: UseLazyLoad('Error', '403')
  },
  {
    name: '404',
    path: '/404',
    hideInMenu: true,
    hideTab: true,
    element: UseLazyLoad('Error', '404')
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
