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

  // 生成新食物
  const generateFood = useCallback(() => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    setFood(newFood)
  }, [snake])

  // 移动蛇
  const moveSnake = useCallback(() => {
    if (gameOver) return

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] }

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

      // 碰撞检测
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE ||
        prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true)
        return prevSnake
      }

      // 创建新蛇
      const newSnake = [head, ...prevSnake]

      // 吃食物检测
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10)
        generateFood()
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food.x, food.y, gameOver, generateFood])

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
    setSnake([{ x: 10, y: 10 }])
    setDirection('RIGHT')
    setScore(0)
    setGameOver(false)
    generateFood()
  }, [generateFood])

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
      return () => clearInterval(id) // 直接通过闭包获取 interval ID
    }
  }, [gameOver, moveSnake])

  // 初始化食物
  useEffect(() => {
    generateFood()
  }, [generateFood])

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
