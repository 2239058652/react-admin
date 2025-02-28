import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { useEffect } from 'react';
import { RouteObject } from 'react-router-dom';
import routes from '@/router';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

// 假设你的路由类型定义如下（根据实际路由配置调整）
type CustomRoute = RouteObject & {
    name?: string;
    icon?: React.ReactNode;
    hideInMenu?: boolean;
    children?: CustomRoute[];
    access?: string[];
};

function generateMenuItems(routes?: CustomRoute[], parentPath = ''): MenuProps[] {
    if (!routes) return [];

    return routes
        .filter(route => !route.hideInMenu && route.name) // 过滤不需要显示的路由
        .map((route) => {
            const fullPath = `${parentPath}/${route.path?.replace(/^\//, '')}`.replace(/\/+/g, '/');

            const menuItem: any = {
                key: fullPath,
                label: route.children ? (
                    <span>{route.name}</span>  // 有子菜单时不需要 Link
                ) : (
                    <Link to={fullPath}>{route.name}</Link>
                ),
                icon: route.icon,
            };

            if (route.children) {
                menuItem.children = generateMenuItems(route.children, fullPath);
            }

            return menuItem;
        });
}

function LayoutMenu() {
    useEffect(() => {
        console.log(routes);
    }, []);
    const location = useLocation();

    // 根据你的实际路由配置调整
    const menuItems = generateMenuItems(routes[0].children) as ItemType<MenuItemType>[];
    console.log(menuItems);

    return (
        <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
        />
    );
}
export default LayoutMenu;