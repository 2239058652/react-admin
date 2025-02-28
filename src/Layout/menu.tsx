import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { RouteObject } from 'react-router-dom';
import routes from '@/router';
import useAuth from '@/hooks/useAuth';

// 假设你的路由类型定义如下（根据实际路由配置调整）
type CustomRoute = RouteObject & {
    name?: string;
    icon?: React.ReactNode;
    hideInMenu?: boolean;
    children?: CustomRoute[];
    access?: string[];
};

// 权限检查方法
const checkPermission = (requiredRoles?: string[], userRoles: string[] = []) => {
    // 如果路由不要求权限则直接放行
    if (!requiredRoles || requiredRoles.length === 0) return true;
    // 检查用户是否拥有任意一个要求的权限
    return userRoles.some(role => requiredRoles.includes(role));
};

function generateMenuItems(
    routes: CustomRoute[],
    userRoles: string[],
    parentPath = ''
): MenuProps['items'] {
    return routes
        .filter(route => {
            // 组合过滤条件
            return (
                !route.hideInMenu &&
                route.name &&
                checkPermission(route.access, userRoles)
            );
        })
        .map(route => {
            const fullPath = `${parentPath}/${route.path?.replace(/^\//, '')}`.replace(/\/+/g, '/');

            const menuItem: MenuProps['items'][number] = {
                key: fullPath,
                label: route.children ? (
                    <span>{route.name}</span>
                ) : (
                    <Link to={fullPath}>{route.name}</Link>
                ),
                icon: route.icon,
            };

            // 递归处理子路由
            if (route.children) {
                menuItem.children = generateMenuItems(route.children, userRoles, fullPath);
                // 如果子菜单无有效项则过滤掉空菜单
                if (!menuItem.children || menuItem.children.length === 0) return null;
            }

            return menuItem;
        })
        .filter(Boolean) as MenuProps['items']; // 过滤掉null项
}

function LayoutMenu() {
    const location = useLocation();
    const { user } = useAuth(); // 从全局状态获取用户信息

    // 生成带权限过滤的菜单项
    const menuItems = generateMenuItems(routes[0].children || [], user?.roles || []);

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