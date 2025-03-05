import React from 'react'
import { Card, Input } from 'antd'

const Dashboard: React.FC = () => {
  return (
    <Card style={{ width: '100%', minHeight: '100%' }}>
      <div>
        <h1>Dashboard</h1>
        <p>这是仪表盘页面。</p>
        <Input placeholder="Basic usage" />
      </div>
    </Card>
  )
}

export default Dashboard
