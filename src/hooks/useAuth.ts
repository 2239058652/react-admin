import { useEffect, useState, useCallback } from 'react';

export function useAuth() {
    const [permissions, setPermissions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const checkPermission = useCallback((required?: string[]) => {
        if (!required) return true;
        return required.some(p => permissions.includes(p));
    }, [permissions]);

    useEffect(() => {
        // 模拟异步获取权限
        setTimeout(() => {
            const mockPermissions = ['dashboard:view']; // 测试权限
            setPermissions(mockPermissions);
            setLoading(false);
        }, 500);
    }, []);

    return { checkPermission, loading, permissions };
}