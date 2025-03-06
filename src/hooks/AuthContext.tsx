import { createContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 用户类型定义
interface User {
  id: string
  username: string
  roles: string[]
}

// 上下文类型
interface AuthContextType {
  user: User | null
  token: string
  login: (username: string, password: string) => Promise<void>
  loginout: () => void
  loading: boolean
}

// 创建上下文
export const AuthContext = createContext<AuthContextType | null>(null)

// 上下文提供者组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const login = useCallback(
    async (_username: string, _password: string) => {
      try {
        setToken('data.token')
        setUser({
          id: 'dsadsadsadsa',
          username: 'admin',
          roles: ['user']
        })
        // // 存储 token
        localStorage.setItem('token', 'data.token')
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: 'dsadsadsadsa',
            username: 'admin',
            roles: ['user']
          })
        )
        navigate('/')

        // // 模拟 API 调用
        // const response = await fetch('/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ username, password })
        // })

        // if (!response.ok) throw new Error('登录失败')

        // const data = await response.json()

        // // 更新状态
        // setUser({
        //   id: data.id,
        //   username: data.username,
        //   roles: data.roles
        // })
        // setToken(data.token)

        // // 存储 token
        // localStorage.setItem('token', data.token)
        // navigate('/')
      } catch (error) {
        console.error('登录错误:', error)
        throw error
      }
    },
    [navigate]
  )

  const loginout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setToken('')
    navigate('/login', { replace: true })
  }, [navigate])

  useEffect(() => {
    const checkAuth = async () => {
      if (token && !user) {
        const localUser = localStorage.getItem('user')
        try {
          setLoading(true)
          // const userData = await fetchUserData(token);
          // const userData = {
          //   id: '1',
          //   username: 'John Doe',
          //   roles: ['admin']
          // }
          if (localUser) {
            setUser(JSON.parse(localUser))
          }
        } catch {
          loginout()
          setLoading(false)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    checkAuth()
  }, [token, user])

  return <AuthContext.Provider value={{ user, token, login, loginout, loading }}>{children}</AuthContext.Provider>
}
