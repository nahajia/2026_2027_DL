import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Tipus from './tipus/Tipus'
import Torta from './tortak/Torta'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Torták</h1>
      <Tipus />
      <Torta />
    </div>
  )
}

export default App
