import React, { useState } from 'react'
import { Card } from 'antd'
import { useDebounceFn } from 'ahooks'
import { getCurrentDateTime } from '@/utils/common'
import './index.scss'

const Dashboard: React.FC = () => {
  const userInfo: IUserInfo = JSON.parse(localStorage.getItem('user') || '{}')
  const options = [
    { value: 'now', label: '实时' },
    { value: 'yesterday', label: '昨日' },
    { value: 'week', label: '本周' },
    { value: 'month', label: '本月' },
    { value: 'year', label: '本年' }
  ]
  const [selectedValue, setSelectedValue] = useState<string | number | null>('now')
  const [nowTime, setNowTime] = useState<string | null>(getCurrentDateTime())
  const { run: handleSelect } = useDebounceFn(
    (value: string | number) => {
      if (value == selectedValue) return
      if (value == 'now') {
        setNowTime(getCurrentDateTime())
      }
      setSelectedValue(value)
    },
    {
      wait: 50
    }
  )

  setInterval(() => {
    setNowTime(getCurrentDateTime())
  }, 1000)

  return (
    <div className="dashboard">
      <div className="dashboard-flex-row">
        <Card className="topleft">
          <div className="avtraname">👏欢迎回来，{userInfo.username}</div>
          <div className="card-info">
            <div className="card-d">
              <div>未打码</div>
              <div>615</div>
              <div>件</div>
            </div>
            <div className="card-d">
              <div>未发货</div>
              <div>615</div>
              <div>件</div>
            </div>
            <div className="card-d">
              <div>售后未审核</div>
              <div>615</div>
              <div>件</div>
            </div>
          </div>
          <div className="sjtj">
            <div className="title">数据统计</div>
            <div className="custom-radio-group">
              <div className="sj">数据更新时间：{nowTime}</div>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`custom-radio ${selectedValue === option.value ? 'selected' : ''}`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
          <div className="fours">
            <div className="f-box">
              <img src="/src/assets/img/cjje.png" alt="" />
              <div className="f-box-text">
                <div className="f-name">成交金额</div>
                <div className="f-b">
                  <span>373.5w+</span>
                  <span>元</span>
                </div>
              </div>
            </div>
            <div className="xiantiao"></div>
            <div className="f-box">
              <img src="/src/assets/img/cjdd.png" alt="" />
              <div className="f-box-text">
                <div className="f-name">成交订单</div>
                <div className="f-b">
                  <span>365</span>
                  <span>单</span>
                </div>
              </div>
            </div>
            <div className="xiantiao"></div>
            <div className="f-box">
              <img src="/src/assets/img/yhfwl.png" alt="" />
              <div className="f-box-text">
                <div className="f-name">用户访问量</div>
                <div className="f-b">
                  <span>8874</span>
                  <span>个</span>
                </div>
              </div>
            </div>
            <div className="xiantiao"></div>
            <div className="f-box">
              <img src="/src/assets/img/xzyh.png" alt="" />
              <div className="f-box-text">
                <div className="f-name">新增用户</div>
                <div className="f-b">
                  <span>2823</span>
                  <span>个</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="topright">
          <Card className="right1">2</Card>
          <Card className="right2">3</Card>
        </div>
      </div>
      <div className="dashboard-flex-row">
        <Card className="bom1">1</Card>
        <Card className="bom2">1</Card>
        <Card className="bom3">3</Card>
      </div>
    </div>
  )
}

export default Dashboard
