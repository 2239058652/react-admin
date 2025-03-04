import { useContext } from 'react'
import { AuthContext } from './AuthContext'

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return {
    user: context.user,
    login: context.login,
    loginout: context.loginout,
    token: context.token,
    loading: context.loading
  }
}

export default useAuth
