import { Suspense, useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import router from './router';
import { Spin } from 'antd';
import './App.scss';

function RouterGuard() {
  const outlet = useRoutes(router);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // 路由守卫逻辑
    if (!token && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    } else if (token && location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [token, location.pathname, navigate]);

  // 增加加载状态提示
  return (
    <Suspense fallback={<Spin fullscreen tip="Loading..." />}>
      {outlet}
    </Suspense>
  );
}

function App() {
  return (
    <div className="App">
      <RouterGuard />
    </div>
  );
}

export default App;