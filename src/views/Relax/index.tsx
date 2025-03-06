import { useState, useEffect, useMemo, useCallback } from 'react'
import './index.scss'

const GRID_SIZE = 20
const GAME_SPEED = 150

interface Position {
  x: number
  y: number
}

interface Cell extends Position {
  isSnake: boolean
  isHead: boolean
  isFood: boolean
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const Relax = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  // 生成网格单元
  const cells = useMemo<Cell[]>(() => {
    const grid: Cell[] = []
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
        const isHead = snake[0].x === x && snake[0].y === y
        const isFood = food.x === x && food.y === y
        grid.push({ x, y, isSnake, isHead, isFood })
      }
    }
    return grid
  }, [snake, food])

  // 新食物生成函数
  const generateNewFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  // 移动蛇的逻辑
  const moveSnake = useCallback(() => {
    if (gameOver) return

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] }

      // 方向移动计算
      switch (direction) {
        case 'UP':
          head.y--
          break
        case 'DOWN':
          head.y++
          break
        case 'LEFT':
          head.x--
          break
        case 'RIGHT':
          head.x++
          break
      }

      // 碰撞检测（使用更新前的蛇身）
      const willCollide =
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE ||
        prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)

      if (willCollide) {
        setGameOver(true)
        return prevSnake
      }

      // 创建新蛇身
      const newSnake = [head, ...prevSnake]

      // 吃食物检测
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10)
        const newFood = generateNewFood(newSnake) // 使用新蛇身生成食物
        setFood(newFood)
        return newSnake // 保持长度
      }

      return newSnake.slice(0, -1) // 正常移动
    })
  }, [direction, food, gameOver, generateNewFood])

  // 方向控制
  const changeDirection = useCallback(
    (newDir: Direction) => {
      const opposite: Record<Direction, Direction> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT'
      }
      if (newDir !== opposite[direction]) {
        setDirection(newDir)
      }
    },
    [direction]
  )

  // 重置游戏
  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }]
    setSnake(initialSnake)
    setDirection('RIGHT')
    setScore(0)
    setGameOver(false)
    setFood(generateNewFood(initialSnake))
  }, [generateNewFood])

  // 键盘控制
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const directions: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT'
      }
      if (directions[e.key]) {
        e.preventDefault()
        changeDirection(directions[e.key])
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [changeDirection])

  // 游戏循环
  useEffect(() => {
    if (!gameOver) {
      const id = setInterval(moveSnake, GAME_SPEED)
      return () => clearInterval(id)
    }
  }, [gameOver, moveSnake])

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="score">得分: {score}</div>
        <div className="controls">
          <button onClick={resetGame}>新游戏</button>
          <div className="direction-keys">
            <button onClick={() => changeDirection('UP')}>↑</button>
            <button onClick={() => changeDirection('LEFT')}>←</button>
            <button onClick={() => changeDirection('DOWN')}>↓</button>
            <button onClick={() => changeDirection('RIGHT')}>→</button>
          </div>
        </div>
      </div>

      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`cell 
              ${cell.isSnake ? 'snake-body' : ''}
              ${cell.isHead ? 'snake-head' : ''}
              ${cell.isFood ? 'food' : ''}
            `}
          />
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>游戏结束!</h2>
          <p>最终得分: {score}</p>
          <button onClick={resetGame}>再玩一次</button>
        </div>
      )}
    </div>
  )
}

export default Relax
