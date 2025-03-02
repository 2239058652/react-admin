import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

export default function ForbiddenPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <Result
        status="403"
        title="403"
        subTitle="抱歉，您无权访问此页面"
        extra={
          <Button type="primary" onClick={() => navigate('/', { replace: true })}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}
