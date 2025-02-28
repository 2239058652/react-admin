import { Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';

function menu() {
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
