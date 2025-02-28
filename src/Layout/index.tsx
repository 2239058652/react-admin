import { Outlet, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import Menu from './menu'
import logo from '../assets/img/logo.png'
import './index.scss'

const { Header, Footer, Sider, Content } = Layout

export default function BasicLayout() {
  const navigate = useNavigate()
  return (
    <Layout className="layout">
      <Sider width={'10.5%'} theme="light" className="sider">
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => navigate('/', { replace: true })} />
        </div>
        <Menu />
      </Sider>

      <Layout className="content-layout">
        <Header className="header">后台管理系统</Header>
        <Content className="content">
          <Outlet />
        </Content>
        <Footer className="footer">© 2024 Your Company. All rights reserved.</Footer>
      </Layout>
    </Layout>
  )
}
