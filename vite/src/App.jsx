import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from 'react'
import Home from './Pages/Home'
import Error404 from './Components/UI/Error404'
import GridBackground from './Components/UI/GridBackground'
import PageTransition from './Components/UI/PageTransition'

const Projects = lazy(() => import('./Pages/Projects'))
const About = lazy(() => import('./Pages/About'))
const Project = lazy(() => import('./Pages/Project'))
const ContactMe = lazy(() => import('./Components/UI/ContactMe').then(m => ({ default: m.ContactMe })))

function App() {
  return (
    <div className="App">
      <GridBackground/>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar/>
        <PageTransition>
          {(location) => (
            <Suspense fallback={null}>
            <Routes location={location}>
                <Route path='/' element={<Home/>}/>
                <Route path='/projects' element={<Projects/>}/>
                <Route path='/projects/:id' element={<Project/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contactme' element={<ContactMe/>}/>
                <Route path='*' element={<Error404/>}/>
            </Routes>
            </Suspense>
          )}
        </PageTransition>
      </div>
    </div>
  )
}

export default App
