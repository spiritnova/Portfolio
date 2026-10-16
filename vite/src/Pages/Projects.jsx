import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, ArrowRight, Lock } from 'lucide-react'
import { GitHubIcon } from '../Components/UI/BrandIcons'
import styles from './Projects.module.css'
import projects from '../api/projects.json'

gsap.registerPlugin(ScrollTrigger)

// each panel gets its own light from the nebula palette
const GLOWS = ['139, 92, 246', '236, 72, 153', '45, 212, 191']

const pad = n => String(n).padStart(2, '0')

function addressBar(project){
    try { return new URL(project.website).hostname.replace(/^www\./, '') }
    catch { return project.title }
}

// the cover in front, and two more desktop screenshots fanned out behind it
function screensFor(project){
    const cover = project.thumbnail ?? project.Images?.[0]
    const rest = (project.Images ?? []).filter(img => img !== cover && !/mobile|(^|\/)m\d/i.test(img))
    return { cover, behind: rest.slice(0, 2) }
}

const workCount = projects.filter(p => p.type === 'Work project').length

export default function Projects(){
    const ref = useRef(null)

    useLayoutEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const ctx = gsap.context(() => {
            gsap.from('[data-intro]', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, clearProps: 'all' })

            const mm = gsap.matchMedia()
            // desktop: as the next panel slides up over this one, it sinks back into the stack
            mm.add('(min-width: 901px)', () => {
                const panels = gsap.utils.toArray(`.${styles.panel}`)
                panels.forEach((panel, i) => {
                    const next = panels[i + 1]
                    if (!next) return
                    // explicit start values: from the card's default "filter: none" GSAP would start at brightness(0), pure black
                    gsap.fromTo(panel.firstElementChild, { scale: 1, filter: 'brightness(1)' }, {
                        scale: 0.92,
                        filter: 'brightness(0.45)',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: next,
                            start: 'top bottom',
                            end: 'top 15%',
                            scrub: true,
                        },
                    })
                })
            })
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <div className={styles.page} ref={ref}>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow} data-intro>view my work</p>
                    <h1 data-intro>Portfolio</h1>
                </div>
                <p className={styles.count} data-intro>
                    <span>{pad(projects.length)}</span> projects
                    <span className={styles.split}>{workCount} work · {projects.length - workCount} personal</span>
                </p>
            </header>

            <ol className={styles.stack}>
                {projects.map((project, i) => {
                    const { cover, behind } = screensFor(project)
                    const summary = project.description.split('\n')[0]
                    return (
                        <li className={styles.panel} key={project.id} style={{ '--i': i, '--glow': GLOWS[i % GLOWS.length] }}>
                            <article className={styles.card}>
                                <div className={styles.info}>
                                    <div className={styles.meta}>
                                        <span className={styles.index}>{pad(i + 1)}</span>
                                        <span className={styles.of}>/ {pad(projects.length)}</span>
                                        {project.type && <span className={styles.type}>{project.type}</span>}
                                        {project.status === 'in-progress' && <span className={styles.badge}>In Progress</span>}
                                    </div>

                                    <h2 className={styles.title}>
                                        <Link to={`/projects/${project.id}`}>{project.title}</Link>
                                    </h2>
                                    <p className={styles.subtitle}>{project.subtitle}</p>
                                    <p className={styles.summary}>{summary}</p>

                                    <ul className={styles.chips} aria-label="Built with">
                                        {project.technologies.map(tech => (
                                            <li className={styles.chip} key={tech}>{tech}</li>
                                        ))}
                                    </ul>

                                    <div className={styles.actions}>
                                        <Link to={`/projects/${project.id}`} className={styles.primary}>
                                            Read case study
                                            <ArrowRight size={18} aria-hidden="true" />
                                        </Link>
                                        {project.website && (
                                            <a href={project.website} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label={`${project.title} live site`}>
                                                <Globe size={18} aria-hidden="true" />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label={`${project.title} GitHub repository`}>
                                                <GitHubIcon size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <Link to={`/projects/${project.id}`} className={styles.screens} tabIndex={-1} aria-hidden="true">
                                    {behind.map((img, b) => (
                                        <img className={`${styles.behind} ${styles[`behind${b}`]}`} src={`/assets/${img}`} alt="" loading="lazy" decoding="async" key={img} />
                                    ))}
                                    {cover && (
                                        <span className={styles.frame}>
                                            <span className={styles.chrome}>
                                                <span className={styles.lights}><i></i><i></i><i></i></span>
                                                <span className={styles.url}><Lock size={10} strokeWidth={2.5} />{addressBar(project)}</span>
                                            </span>
                                            <img src={`/assets/${cover}`} alt="" decoding="async" />
                                            {project.Images?.length > 1 && (
                                                <span className={styles.more}>{project.Images.length} screens</span>
                                            )}
                                        </span>
                                    )}
                                </Link>
                            </article>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
