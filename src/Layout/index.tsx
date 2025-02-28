import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Menu from './menu'
import logo from '../assets/img/logo.png'
import './index.scss'

const { Header, Footer, Sider, Content } = Layout

// 全屏布局样式
const layoutStyle: React.CSSProperties = {
  height: '100vh',
  display: 'flex'
}

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#fff'
}

const contentLayoutStyle: React.CSSProperties = {
  marginLeft: '200px', // 需要与Sider宽度保持一致
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}

const headerStyle: React.CSSProperties = {
  padding: 0,
  backgroundColor: '#ffffff',
  color: '#fff',
  height: 64,
  lineHeight: '64px',
  paddingLeft: 24
}

const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: 24,
  overflow: 'auto',
  backgroundColor: '#f5f5f5' // 更柔和的背景色
}

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#ffffff',
  color: '#fff',
  padding: 16
}

export default function BasicLayout() {
  return (
    <Layout style={layoutStyle}>
      <Sider width={200} style={siderStyle} theme="light">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Menu />
      </Sider>

      <Layout style={contentLayoutStyle}>
        <Header style={headerStyle}>后台管理系统</Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>© 2024 Your Company. All rights reserved.</Footer>
      </Layout>
    </Layout>
  )
}
