import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Bgpic from '@/assets/img/bg.png'
import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd'

export default function Login() {
  const navigate = useNavigate()

  type FieldType = {
    username?: string
    password?: string
    remember?: string
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
    localStorage.setItem('token', 'your-auth-token')
    navigate('/home', { replace: true })
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
          layout={'vertical'}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="账号" name="username" rules={[{ required: true, message: '请输入账号' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
