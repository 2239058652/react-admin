import React, { lazy } from 'react'

const Page1 = lazy(() => import('@/pages/Page1'))
const Page2 = lazy(() => import('@/pages/Page2'))

import Home from '@/pages/Home'

const routes = [
    {
        path: '/',
        element: <Page1 />,
    },
    {
        path: '/page2',
        element: <Page2 />,
    }
    // 嵌套路由到此结束
    //   {
    //     path: '/login',
    //     element: <Login />
    //   },
    //   {
    //     path: '*', // 重定向到首页，相当于404未找到页面
    //     element: <Navigate to={'/page1'} />
    //   }
]

export default routes