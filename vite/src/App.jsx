import './App.css'
import Navbar from './Components/Navbar'
import useLocalStorage from 'use-local-storage'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import About from './Pages/About'

function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <div className="App" data-theme={theme}>
      <Navbar onToggle={toggleTheme}/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
