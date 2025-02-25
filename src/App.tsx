import { useState } from 'react'
import './App.scss'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div onClick={() =>setCount(0)}>count: {count}</div>
    </>
  )
}

export default App
