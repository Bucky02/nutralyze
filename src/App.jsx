import { useState } from 'react'
import reactLogo from './assets/react.svg'
import nutrLogoIntero from './assets/logoIntero.png'
import './App.css'
import Header from './components/Header'
import Search from './components/Divsearch'
import Diary from './components/Divdiary'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header></Header>
      <div className="main-layout">
    <Search></Search>
    <Diary></Diary>
    </div>
    </>
  )
}

export default App
