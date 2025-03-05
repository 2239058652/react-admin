import { AuthProvider } from './hooks/AuthContext'
import { SettingsProvider } from '@/contexts/SettingsContext'
import { TabsProvider } from '@/contexts/TabsContext'
import { UseRouterGuard } from '@/hooks/RouterGuard'
import './App.scss'

function App() {
  return (
    <div className="App">
      <SettingsProvider>
        <TabsProvider>
          <AuthProvider>
            <UseRouterGuard />
          </AuthProvider>
        </TabsProvider>
      </SettingsProvider>
    </div>
  )
}

export default App
