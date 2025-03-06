import React, { useEffect } from 'react'
import { Avatar, Badge, Dropdown, FloatButton } from 'antd'
import { SettingOutlined, SearchOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import useAuth from '@/hooks/useAuth'
import '../index.scss'

const Header: React.FC<HeaderModalProps> = (props) => {
  const { settingsOpen, setSettingsOpen } = props
  const { loginout } = useAuth()
  const userInfo: IUserInfo = JSON.parse(localStorage.getItem('user') || '{}')
  const dropDownItems: MenuProps['items'] = [
    {
      label: '个人中心',
      key: 'userInfo'
    },
    {
      label: '退出登录',
      key: 'loginOut'
    }
  ]
  useEffect(() => {
    console.log('userInfo', userInfo)
  }, [])

  const handleLoginOut: MenuProps['onClick'] = ({ key }) => {
    if (key === 'loginOut') {
      loginout()
    }
  }
  return (
    <div className="header-modal">
      <div className="header-modal-content">
        <img src="/src/assets/img/search.png" alt="" />
        <Badge dot>
          <img src="/src/assets/img/dot.png" alt="" />
        </Badge>
        <div className="header-modal-content-user">
          <Avatar src={<img src="/src/assets/img/user.png" alt="avatar" />} />
          <span>{userInfo.username}</span>
        </div>
        <Dropdown
          menu={{ items: dropDownItems, onClick: handleLoginOut }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <div className="arrow-down">
            <img src="/src/assets/img/arrowd.png" alt="" />
          </div>
        </Dropdown>
      </div>
      {settingsOpen && (
        <FloatButton icon={<SettingOutlined />} onClick={() => setSettingsOpen(true)} style={{ right: 24 }} />
      )}
    </div>
  )
}

export default Header
