import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import About from './Pages/About'
import Project from './Pages/Project'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/projects/:id' element={<Project/>}/>
          <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
