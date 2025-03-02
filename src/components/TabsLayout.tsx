import { Tabs } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTabs } from '@/contexts/TabsContext'

export default function TabsLayout() {
  const { tabs, activeKey, removeTab, setActiveKey } = useTabs()
  const navigate = useNavigate()
  const location = useLocation()

  const onChange = (key: string) => {
    setActiveKey(key)
    navigate(key)
  }

  const onEdit = (
    targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    action: 'add' | 'remove'
  ) => {
    if (action === 'remove' && typeof targetKey === 'string') {
      removeTab(targetKey)
      if (targetKey === location.pathname) {
        navigate(tabs.find((t) => t.key !== targetKey)?.key || '/')
      }
    }
  }

  return (
    <Tabs
      type="editable-card"
      hideAdd
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={tabs.map((tab) => ({
        key: tab.key,
        label: tab.label,
        closable: tab.closable
      }))}
    />
  )
}
