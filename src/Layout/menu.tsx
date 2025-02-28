import { Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import routes from '@/router';
import { useEffect } from 'react';

function menu() {
    useEffect(() => {
        console.log(routes);
    }, []);

    return (
        <Menu
            theme="light"
            mode="inline"
            items={[
                {
                    key: 'home',
                    label: <Link to="/home">首页</Link>,
                    icon: <span>🏠</span>
                },
                {
                    key: 'dashboard',
                    label: <Link to="/dashboard">仪表盘</Link>,
                    icon: <span>📊</span>
                }
            ]}
        />
    )
}

export default menu
