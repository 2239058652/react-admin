// import { useNavigate } from 'react-router-dom'
import Bgpic from '@/assets/img/bg.png'
import { Button, Form, Input, Col, Row } from 'antd'
import type { FormProps } from 'antd'
import useAuth from '@/hooks/useAuth'
import styles from './index.module.scss'

const Login: React.FC = () => {
  // const navigate = useNavigate()
  const { login } = useAuth()

  type FieldType = {
    username?: string
    password?: string
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    await login(values.username!, values.password!)
    // localStorage.setItem('token', 'your-auth-token')
    // navigate('/')
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.bg}>
        <img src={Bgpic} alt="背景图" />
      </div>
      <div className={styles.loginBox}>
        <div className={styles.loginForm}>
          <div className={styles.title}>欢迎登录</div>
          <div className={styles.name}>抖发货源后台管理系统</div>
        </div>
        <Form
          component="form"
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginTop: '5%' }}
        >
          <Row>
            <Col span={24}>
              <Form.Item<FieldType> label="账号" name="username" rules={[{ required: true, message: '请输入账号' }]}>
                <Input autoComplete="username" size="large" placeholder="请输入账号" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginTop: '5%' }}>
              <Form.Item<FieldType> label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password autoComplete="current-password" size="large" placeholder="请输入密码" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', marginTop: '10%' }}>
                  登录
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Login
