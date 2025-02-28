import { useContext } from 'react';
import { AuthContext } from './AuthContext';

interface User {
    id: string;
    name: string;
    roles: string[];
}

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return {
        user: context.user,
        login: context.login,
        logout: context.logout
    };
};

export default useAuth;