import React, { createContext, useContext, useState, useEffect } from 'react'

type ThemeSettings = {
  primaryColor: string
  secondaryColor: string
  fontColor: string
  menuStyle: 'vertical' | 'horizontal'
  compactMode: boolean
}

type SettingsContextType = {
  settings: ThemeSettings
  setSettings: (settings: ThemeSettings) => void
}

const defaultSettings: ThemeSettings = {
  primaryColor: '#1890ff',
  secondaryColor: '#f0f2f5',
  fontColor: '#333',
  menuStyle: 'vertical',
  compactMode: false
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  setSettings: () => {}
})

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('themeSettings')
    return saved ? JSON.parse(saved) : defaultSettings
  })

  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(settings))
    applyThemeVariables(settings)
  }, [settings])

  return <SettingsContext.Provider value={{ settings, setSettings }}>{children}</SettingsContext.Provider>
}

const applyThemeVariables = (settings: ThemeSettings) => {
  const root = document.documentElement
  root.style.setProperty('--primary-color', settings.primaryColor)
  root.style.setProperty('--secondary-color', settings.secondaryColor)
  root.style.setProperty('--font-color', settings.fontColor)
}

export const useSettings = () => useContext(SettingsContext)
