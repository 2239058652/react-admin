import { useEffect } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import router from './router/index'

function ToPage1() {
  const navigateTo = useNavigate()
  useEffect(() => {
    navigateTo('/')
  }, [navigateTo])
  return <div></div>
}
function ToLogin() {
  const navigateTo = useNavigate()
  useEffect(() => {
    navigateTo('/login')
  }, [navigateTo])
  return <div>xx</div>
}
// 路由守卫
function BeforeRouterEnter() {
  const outlet = useRoutes(router)
  const location = useLocation()
  const token = localStorage.getItem('token')
  console.log('outlet', outlet);


  return outlet
}

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BeforeRouterEnter />
    </div>
  )
}

export default App