import { useState, useEffect, useMemo } from 'react'
import './index.scss'

const HandleTest = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [motivationalMessage, setMotivationalMessage] = useState('')

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

  const calculateTimeLeft = () => {
    const now = new Date()
    const target = new Date()
    target.setHours(18, 30, 0)

    if (now >= target) {
      target.setDate(target.getDate() + 1)
    }

    const diff = target.getTime() - now.getTime()

    setHours(Math.floor(diff / (1000 * 60 * 60)))
    setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
    setSeconds(Math.floor((diff % (1000 * 60)) / 1000))
  }

  const progressPercentage = useMemo(() => {
    const now = new Date()
    const start = new Date()
    start.setHours(9, 0, 0)
    const end = new Date()
    end.setHours(18, 30, 0)

    const total = end.getTime() - start.getTime()
    const current = now.getTime() - start.getTime()

    return Math.min(Math.max((current / total) * 100, 0), 100)
  }, [hours, minutes, seconds])

  useEffect(() => {
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const messageTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalMessages.length)
      setMotivationalMessage(motivationalMessages[randomIndex])
    }, 10000)
    return () => clearInterval(messageTimer)
  }, [])

  return (
    <div className="page-container">
      <div className="animated-background"></div>

      <div className="poetry-elements">
        <div className="poem">"会当凌绝顶，一览众山小。" - 杜甫</div>
        <div className="poem">"采菊东篱下，悠然见南山。" - 陶渊明</div>
        <div className="poem">"长风破浪会有时，直挂云帆济沧海。" - 李白</div>
        <div className="poem">"绿树村边合，青山郭外斜。" - 王维</div>
      </div>

      <div className="countdown-container">
        <h2 className="title">
          <span className="emoji">⏰</span>
          下班倒计时
          <span className="emoji">🎉</span>
        </h2>

        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <div className="time-display">
          <div className="time-block">
            <span className="time">{hours}</span>
            <span className="label">小时</span>
          </div>
          <div className="time-block">
            <span className="time">{minutes}</span>
            <span className="label">分钟</span>
          </div>
          <div className="time-block">
            <span className="time">{seconds}</span>
            <span className="label">秒</span>
          </div>
        </div>

        <div className="motivation">{motivationalMessage}</div>

        <div className="target-time">
          <span className="icon">🌙</span> 下班时间: 18:30
        </div>
      </div>
    </div>
  )
}

export default HandleTest
