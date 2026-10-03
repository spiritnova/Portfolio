import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Navigate, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from 'react'
import Home from './Pages/Home'
import Error404 from './Components/UI/Error404'
import Starfield from './Components/UI/Starfield'
import PageTransition from './Components/UI/PageTransition'
import PageMeta from './Components/UI/PageMeta'

const Projects = lazy(() => import('./Pages/Projects'))
const About = lazy(() => import('./Pages/About'))
const Project = lazy(() => import('./Pages/Project'))
const ContactMe = lazy(() => import('./Components/UI/ContactMe').then(m => ({ default: m.ContactMe })))

function App() {
  return (
    <div className="App">
      <PageMeta/>
      <Starfield/>
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
                <Route path='/contact' element={<ContactMe/>}/>
                <Route path='/contactme' element={<Navigate to='/contact' replace/>}/>
                <Route path='*' element={<Error404/>}/>
            </Routes>
            </Suspense>
          )}
        </PageTransition>
        <Footer/>
      </div>
    </div>
  )
}

export default App
