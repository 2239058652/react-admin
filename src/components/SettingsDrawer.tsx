import { Drawer, ColorPicker, Select, Switch, Form, Space, Button } from 'antd'
import { useSettings } from '@/contexts/SettingsContext'
import { useEffect, useState } from 'react'

const SettingsDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { settings, setSettings } = useSettings()
  const [form] = Form.useForm()

  const onFinish = (values: typeof settings) => {
    setSettings(values)
    onClose()
  }
  // 在设置抽屉中根据屏幕宽度调整
  const [drawerWidth, setDrawerWidth] = useState(350)
  // 在 SettingsDrawer.tsx 中添加以下内容
  const presets = {
    default: {
      primaryColor: '#1890ff',
      secondaryColor: '#f0f2f5',
      fontColor: '#333',
      menuStyle: 'vertical',
      compactMode: false
    },
    dark: {
      primaryColor: '#001529',
      secondaryColor: '#000c17',
      fontColor: 'rgba(255, 255, 255, 0.85)',
      menuStyle: 'vertical',
      compactMode: false
    },
    compact: {
      primaryColor: '#1890ff',
      secondaryColor: '#f0f2f5',
      fontColor: '#333',
      menuStyle: 'vertical',
      compactMode: true
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(window.innerWidth > 768 ? 350 : 280)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Drawer title="全局设置" placement="right" width={drawerWidth} onClose={onClose} open={open}>
      <Form form={form} layout="vertical" initialValues={settings} onFinish={onFinish}>
        <Form.Item label="预设主题" name="preset">
          <Select>
            <Select.Option value="default">默认主题</Select.Option>
            <Select.Option value="dark">暗黑主题</Select.Option>
            <Select.Option value="compact">紧凑主题</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="主色调" name="primaryColor">
          <ColorPicker format="hex" />
        </Form.Item>

        <Form.Item label="次色调" name="secondaryColor">
          <ColorPicker format="hex" />
        </Form.Item>

        <Form.Item label="字体颜色" name="fontColor">
          <ColorPicker format="hex" />
        </Form.Item>

        <Form.Item label="菜单布局" name="menuStyle">
          <Select
            options={[
              { value: 'vertical', label: '垂直菜单' },
              { value: 'horizontal', label: '水平菜单' }
            ]}
          />
        </Form.Item>

        <Form.Item label="紧凑模式" name="compactMode" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              应用设置
            </Button>
            <Button onClick={onClose}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default SettingsDrawer
