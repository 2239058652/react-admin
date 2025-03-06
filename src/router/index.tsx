import { Navigate } from 'react-router-dom'
import Layout from '@/Layout'
import {
  FundProjectionScreenOutlined,
  OrderedListOutlined,
  ProductOutlined,
  SettingOutlined,
  SolutionOutlined,
  UserOutlined,
  WalletOutlined
} from '@ant-design/icons'
import { UseLazyLoad } from '@/hooks/useLazyLoad'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
        hideInMenu: true
      },
      {
        name: '仪表盘',
        icon: <FundProjectionScreenOutlined />,
        path: 'dashboard',
        element: UseLazyLoad('Dashboard')
      },
      {
        path: 'orders',
        name: '订单管理',
        icon: <OrderedListOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to="/orders/analysis" replace />,
            hideInMenu: true
          },
          {
            path: 'analysis',
            name: '订单列表',
            element: UseLazyLoad('Home')
          },
          {
            path: 'monitor',
            name: '售后订单',
            element: UseLazyLoad('Dashboard'),
            access: ['admin', 'user']
          },
          {
            path: 'monitors',
            name: '异常订单',
            element: UseLazyLoad('Dashboard'),
            access: ['admin', 'user']
          }
        ]
      },
      {
        path: 'goods',
        name: '商品管理',
        icon: <ProductOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to="/goods/analysis" replace />,
            hideInMenu: true
          },
          {
            path: 'analysis',
            name: '商品列表',
            element: UseLazyLoad('Home')
          }
        ]
      },
      {
        path: 'usermanage',
        name: '用户管理',
        icon: <UserOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to="/usermanage/users" replace />,
            hideInMenu: true
          },
          {
            path: 'users',
            name: '用户列表',
            element: UseLazyLoad('UserManage/Users')
          },
          {
            path: 'stores',
            name: '用户店铺',
            element: UseLazyLoad('UserManage/Stores')
          }
        ]
      },
      {
        path: 'roles',
        name: '角色管理',
        icon: <SolutionOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to="/roles/analysis" replace />,
            hideInMenu: true
          },
          {
            path: 'analysis',
            name: '系统设置',
            element: UseLazyLoad('Home')
          }
        ]
      },
      {
        path: 'cashes',
        name: '财务管理',
        icon: <WalletOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to="/cashes/analysis" replace />,
            hideInMenu: true
          },
          {
            path: 'analysis',
            name: '系统设置',
            element: UseLazyLoad('Home')
          }
        ]
      },
      {
        path: 'systems',
        name: '系统配置',
        icon: <SettingOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to="/systems/analysis" replace />,
            hideInMenu: true
          },
          {
            path: 'analysis',
            name: '系统设置',
            element: UseLazyLoad('Home')
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
