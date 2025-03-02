import { createContext, useContext, useState } from 'react'

export type Tab = {
  key: string
  path: string
  label: string
  closable: boolean
}

type TabsContextType = {
  tabs: Tab[]
  activeKey: string
  addTab: (tab: Omit<Tab, 'closable'>) => void
  removeTab: (targetKey: string) => void
  setActiveKey: (key: string) => void
}

const TabsContext = createContext<TabsContextType>({
  tabs: [],
  activeKey: '',
  addTab: () => {},
  removeTab: () => {},
  setActiveKey: () => {}
})

export const TabsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeKey, setActiveKey] = useState('')

  // 在 TabsContext 中增强 addTab 逻辑
  const addTab = (newTab: Omit<Tab, 'closable'>) => {
    setTabs((prev) => {
      // 排除登录页和错误页
      if (['/login', '/403', '/404'].includes(newTab.key)) return prev

      // 合并相同路由参数的路径
      const normalizedKey = newTab.key.replace(/\?.*/, '')
      const exists = prev.some((tab) => tab.key === normalizedKey || tab.key.startsWith(normalizedKey + '?'))

      return exists ? prev : [...prev, { ...newTab, closable: newTab.key !== '/' }]
    })
    setActiveKey(newTab.key)
  }

  const removeTab = (targetKey: string) => {
    setTabs((prev) => {
      const newTabs = prev.filter((tab) => tab.key !== targetKey)
      if (targetKey === activeKey && newTabs.length > 0) {
        const lastTab = newTabs[newTabs.length - 1]
        setActiveKey(lastTab.key)
      }
      return newTabs
    })
  }

  return (
    <TabsContext.Provider value={{ tabs, activeKey, addTab, removeTab, setActiveKey }}>{children}</TabsContext.Provider>
  )
}

export const useTabs = () => useContext(TabsContext)
