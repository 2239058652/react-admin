interface IUserInfo {
  id: string | number
  roles: string[]
  username: string
}

interface HeaderModalProps {
  settingsOpen: boolean
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
