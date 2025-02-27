import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const onFinish = () => {
        localStorage.setItem('token', 'your-auth-token');
        navigate('/');
    };

    return (
        <div className="login-container">
            <Form onFinish={onFinish}>
                <Form.Item name="username" rules={[{ required: true }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}