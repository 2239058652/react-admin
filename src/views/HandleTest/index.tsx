import { useState, useEffect, useMemo } from 'react'
import './index.scss'

const HandleTest = () => {
  // 状态管理
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [customHour, setCustomHour] = useState(18)
  const [customMinute, setCustomMinute] = useState(30)
  const [motivationalMessage, setMotivationalMessage] = useState('')

  // 从 localStorage 读取保存的时间
  useEffect(() => {
    const savedTime = localStorage.getItem('offWorkTime')
    if (savedTime) {
      const [h, m] = savedTime.split(':').map(Number)
      setCustomHour(h)
      setCustomMinute(m)
    }
  }, [])

  // 时间计算逻辑
  const calculateTimeLeft = () => {
    const now = new Date()
    const target = new Date()
    target.setHours(customHour, customMinute, 0)

    if (now >= target) {
      target.setDate(target.getDate() + 1)
    }

    const diff = target.getTime() - now.getTime()

    setHours(Math.floor(diff / (1000 * 60 * 60)))
    setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
    setSeconds(Math.floor((diff % (1000 * 60)) / 1000))
  }

  // 进度条计算
  const progressPercentage = useMemo(() => {
    const now = new Date()
    const start = new Date()
    start.setHours(9, 0, 0)
    const end = new Date()
    end.setHours(customHour, customMinute, 0)

    const total = end.getTime() - start.getTime()
    const current = now.getTime() - start.getTime()

    return Math.min(Math.max((current / total) * 100, 0), 100)
  }, [customHour, customMinute, hours])

  // 倒计时更新
  useEffect(() => {
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [customHour, customMinute])

  // 激励消息
  const motivationalMessages = [
    '马上就要下班啦，再坚持一下！ 💪',
    '今天也辛苦了！ 🌟',
    '想想美好的下班时光~ 🎵',
    '快要解放啦！ 🚀',
    '马上就能回家啦！ 🏠',
    '放松心情，享受生活！ 🌈',
    '下班后的小确幸在等着你！ 🍰',
    '再努力一点，胜利就在眼前！ 🏆'
  ]

  useEffect(() => {
    const messageTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalMessages.length)
      setMotivationalMessage(motivationalMessages[randomIndex])
    }, 10000)
    return () => clearInterval(messageTimer)
  }, [])

  // 保存时间设置
  const saveCustomTime = () => {
    if (customHour < 0 || customHour > 23 || customMinute < 0 || customMinute > 59) {
      alert('请输入有效时间（小时: 0-23，分钟: 0-59）')
      return
    }

    localStorage.setItem('offWorkTime', `${customHour}:${customMinute}`)
    setIsEditing(false)
  }

  return (
    <div className="page-container">
      <div className="animated-background"></div>

      <div className="poetry-elements">{/* 诗词部分保持不变 */}</div>

      <div className="countdown-container">
        <h2 className="title">
          <span className="emoji">⏰</span>
          下班倒计时
          <span className="emoji">🎉</span>
        </h2>

        {/* 时间设置区域 */}
        <div className="time-setting">
          {isEditing ? (
            <div className="time-picker">
              <input
                type="number"
                min="0"
                max="23"
                value={customHour}
                onChange={(e) => setCustomHour(Number(e.target.value))}
              />
              :
              <input
                type="number"
                min="0"
                max="59"
                value={customMinute}
                onChange={(e) => setCustomMinute(Number(e.target.value))}
              />
              <button onClick={saveCustomTime}>保存</button>
              <button onClick={() => setIsEditing(false)}>取消</button>
            </div>
          ) : (
            <div className="target-time">
              <span className="icon">🌙</span>
              下班时间: {`${customHour.toString().padStart(2, '0')}:${customMinute.toString().padStart(2, '0')}`}
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                ✏️ 修改
              </button>
            </div>
          )}
        </div>

        {/* 其他部分保持不变 */}
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <div className="time-display">
          <div className="time-block">
            <span className="time">{hours.toString().padStart(2, '0')}</span>
            <span className="label">小时</span>
          </div>
          <div className="time-block">
            <span className="time">{minutes.toString().padStart(2, '0')}</span>
            <span className="label">分钟</span>
          </div>
          <div className="time-block">
            <span className="time">{seconds.toString().padStart(2, '0')}</span>
            <span className="label">秒</span>
          </div>
        </div>

        <div className="motivation">{motivationalMessage}</div>
      </div>
    </div>
  )
}

export default HandleTest
