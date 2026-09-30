import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import projects from '../../api/projects.json'

const SITE = 'Ibrahim Abboud'
const TITLES = {
    '/': 'Ibrahim Abboud — Full Stack Web Developer',
    '/projects': `Projects | ${SITE}`,
    '/about': `About | ${SITE}`,
    '/contact': `Contact | ${SITE}`,
}

function titleFor(pathname){
    if (TITLES[pathname]) return TITLES[pathname]
    const match = pathname.match(/^\/projects\/(\d+)$/)
    const project = match && projects.find(p => p.id === Number(match[1]))
    return project ? `${project.title} | ${SITE}` : `Page not found | ${SITE}`
}

// Keeps the previous route mounted while it animates out, then swaps in the new one.
export default function PageTransition({ children }){
    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location)
    const ref = useRef(null)
    const reduced = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    useEffect(() => {
        if (location.pathname === displayLocation.pathname) return
        if (reduced.current){
            setDisplayLocation(location)
            return
        }
        const tween = gsap.to(ref.current, {
            opacity: 0,
            y: -16,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => setDisplayLocation(location),
        })
        return () => tween.kill()
    }, [location, displayLocation.pathname])

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        document.title = titleFor(displayLocation.pathname)
        if (reduced.current) return
        const tween = gsap.fromTo(
            ref.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' },
        )
        return () => tween.kill()
    }, [displayLocation.pathname])

    return <div ref={ref}>{children(displayLocation)}</div>
}
