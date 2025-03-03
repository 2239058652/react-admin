import React from 'react'
import { Card, Input } from 'antd'

const Dashboard: React.FC = () => {
  return (
    <Card title="Dashboard">
      <div>
        <h1>仪表盘</h1>
        <p>这是仪表盘页面。</p>
        <Input placeholder="Basic usage" />
      </div>
    </Card>
  )
}

export default Dashboard
