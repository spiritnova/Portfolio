import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Home.module.css'
import cardStyles from './Projects.module.css'
import projects from '../api/projects.json'
import useScrollReveal from '../Components/useScrollReveal'
import WorkedAt from '../Components/WorkedAt'
import Services from '../Components/Services'

gsap.registerPlugin(ScrollTrigger)

const featured = projects.filter(p => p.status !== 'in-progress' && p.Images?.length).slice(0, 3)

// Lazy-loaded from Home so ScrollTrigger stays out of the first paint.
export default function SelectedWork(){
    const ref = useRef(null)
    useScrollReveal(ref)

    useLayoutEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const timers = []

        const ctx = gsap.context(() => {
            // headings rise up from behind the planet's horizon
            gsap.utils.toArray('[data-rise]').forEach(el => {
                gsap.from(el, {
                    y: 70,
                    opacity: 0,
                    filter: 'blur(6px)',
                    duration: 1.1,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity,filter',
                    scrollTrigger: { trigger: el, start: 'top 92%', once: true },
                })
            })

            // each card's border lights up once as it arrives, the same light as on hover
            ScrollTrigger.batch(`.${cardStyles.card}`, {
                start: 'top 85%',
                once: true,
                onEnter: batch => batch.forEach((card, i) => {
                    timers.push(setTimeout(() => card.classList.add(cardStyles.sweep), 350 + i * 180))
                }),
            })
        }, ref)

        return () => {
            timers.forEach(clearTimeout)
            ctx.revert()
        }
    }, [])

    return (
        <div className={styles.below} ref={ref}>
            <WorkedAt/>

            <section className={styles.work} aria-labelledby="selected-work">
                <div className={styles.workHeader} data-rise>
                    <div>
                        <p className={styles.workEyebrow}>Selected work</p>
                        <h2 id="selected-work">Recent projects</h2>
                    </div>
                    <Link to="/projects" className={styles.allLink}>
                        All projects
                        <ArrowRight size="1em" aria-hidden="true" />
                    </Link>
                </div>

                <div className={styles.workGrid}>
                    {featured.map(project => (
                        <Link to={`/projects/${project.id}`} className={`${cardStyles.card} ${styles.workCard}`} key={project.id} data-reveal>
                            <div className={cardStyles.media}>
                                <img src={`/assets/${project.Images[0]}`} alt="" loading="lazy" />
                                {project.type && <span className={cardStyles.typeTag}>{project.type}</span>}
                            </div>
                            <div className={cardStyles.body}>
                                <span className={cardStyles.eyebrow}>{project.subtitle}</span>
                                <h3 className={cardStyles.title}>{project.title}</h3>
                                {project.highlights?.[0] && <p className={styles.workSummary}>{project.highlights[0]}</p>}
                                <div className={cardStyles.chips}>
                                    {project.technologies.map(tech => (
                                        <span className={cardStyles.chip} key={tech}>{tech}</span>
                                    ))}
                                </div>
                                <span className={styles.caseStudy}>
                                    Read case study
                                    <ArrowRight size="1em" aria-hidden="true" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Services/>
        </div>
    )
}
