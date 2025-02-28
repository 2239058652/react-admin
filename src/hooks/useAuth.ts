import { useContext } from 'react'
import { AuthContext } from './AuthContext'

const useAuth = () => {
    const context = useContext(AuthContext)
    console.log(context, 'cccccccc');


    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return {
        user: context.user,
        login: context.login,
        logout: context.logout,
        token: context.token
    }
}

export default useAuth
