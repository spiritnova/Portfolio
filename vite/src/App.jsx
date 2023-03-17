import './App.css'
import Navbar from './Components/Navbar'
import useLocalStorage from 'use-local-storage'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import About from './Pages/About'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
