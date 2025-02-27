import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

export default function BasicLayout() {
    return (
        <Layout className="layout">
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={[
                        { key: 'home', label: <Link to="/home">Home</Link> },
                        { key: 'dashboard', label: <Link to="/dashboard">Dashboard</Link> }
                    ]}
                />
            </Header>
            <Content style={{ padding: '20px' }}>
                <Outlet />
            </Content>
        </Layout>
    );
}