import { Outlet, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import SettingsDrawer from '@/components/SettingsDrawer'
import { useState } from 'react'
import TabsLayout from '@/components/TabsLayout'
import MenuModal from './components/Menu'
import HeaderModal from './components/Header'
import logo from '../assets/img/logo.png'
import './index.scss'

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
        <MenuModal />
      </Sider>

      <Layout className="content-layout">
        <Header className="header">
          <HeaderModal settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
        </Header>
        <Content className="content">
          {settingsOpen && <TabsLayout />}
          <Outlet />
        </Content>
        {settingsOpen && <Footer className="footer">© 2024 Your Company. All rights reserved.</Footer>}
      </Layout>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </Layout>
  )
}
