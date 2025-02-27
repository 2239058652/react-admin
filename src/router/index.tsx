import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/Layout'; // 假设你的布局组件路径

// 使用React.lazy实现动态加载
const Login = lazy(() => import('@/views/Login'));
const Home = lazy(() => import('@/views/Home'));
const Dashboard = lazy(() => import('@/views/Dashboard'));

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
                path: 'home',
                element: <Home />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    }
];

export default routes;