import { Outlet, useNavigate } from 'react-router-dom'
import { Layout, FloatButton } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import Menu from './menu'
import logo from '../assets/img/logo.png'
import './index.scss'
import SettingsDrawer from '@/components/SettingsDrawer'
import { useState } from 'react'

const { Header, Footer, Sider, Content } = Layout

export default function BasicLayout() {
  const navigate = useNavigate()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <Layout className="layout">
      <Sider width={'10.5%'} theme="light" className="sider">
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => navigate('/', { replace: true })} />
        </div>
        <Menu />
      </Sider>

      <Layout className="content-layout">
        <Header className="header">
          后台管理系统
          <FloatButton icon={<SettingOutlined />} onClick={() => setSettingsOpen(true)} style={{ right: 24 }} />
        </Header>
        <Content className="content">
          <Outlet />
        </Content>
        <Footer className="footer">© 2024 Your Company. All rights reserved.</Footer>
      </Layout>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </Layout>
  )
}
