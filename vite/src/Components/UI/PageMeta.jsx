import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import projects from '../../api/projects.json'

const NAME = 'Ibrahim Abboud'

function metaFor(pathname){
    const project = pathname.match(/^\/projects\/(\d+)\/?$/)
    if (project) {
        const item = projects.find(p => p.id === Number(project[1]))
        if (item) return {
            title: `${item.title} — ${item.subtitle} | ${NAME}`,
            description: `${item.title}: ${item.description.split('\n')[0]}`.slice(0, 300),
        }
    }
    switch (pathname.replace(/\/$/, '')) {
        case '': return null
        case '/projects': return {
            title: `Projects — React Web Apps & Case Studies | ${NAME}`,
            description: 'Selected React and full stack web projects by Ibrahim Abboud: TechBus, ImperialJet, Novagram and more, with screenshots, tech stacks and highlights.',
        }
        case '/about': return {
            title: `About — Full Stack Web Developer in Beirut | ${NAME}`,
            description: 'About Ibrahim Abboud, a Full Stack Web Developer in Beirut, Lebanon with 3+ years of experience in React, JavaScript, Python, Flask and Node.js. Download the resume.',
        }
        case '/contact': return {
            title: `Contact — Hire a Web Developer | ${NAME}`,
            description: 'Get in touch with Ibrahim Abboud for web development projects and opportunities. Email, phone, LinkedIn, GitHub or the contact form.',
        }
        default: return { title: `Page not found | ${NAME}`, description: '' }
    }
}

// The index.html tags are the defaults for "/"; this swaps them per route for a single-page app.
const defaults = {}

export default function PageMeta(){
    const { pathname } = useLocation()

    useEffect(() => {
        const desc = document.querySelector('meta[name="description"]')
        defaults.title ??= document.title
        defaults.description ??= desc?.getAttribute('content') ?? ''

        const meta = metaFor(pathname) ?? defaults
        document.title = meta.title
        if (desc && meta.description) desc.setAttribute('content', meta.description)
    }, [pathname])

    return null
}
