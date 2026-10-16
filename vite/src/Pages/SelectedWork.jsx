import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Home.module.css'
import projects from '../api/projects.json'
import useScrollReveal from '../Components/useScrollReveal'
import WorkedAt from '../Components/WorkedAt'
import Services from '../Components/Services'
import ProjectCarousel from '../Components/ProjectCarousel'

gsap.registerPlugin(ScrollTrigger)

const featured = projects.filter(p => p.status !== 'in-progress' && p.Images?.length)

// Lazy-loaded from Home so ScrollTrigger stays out of the first paint.
export default function SelectedWork(){
    const ref = useRef(null)
    useScrollReveal(ref)

    useLayoutEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

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
        }, ref)

        return () => ctx.revert()
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

                <ProjectCarousel projects={featured}/>
            </section>

            <Services/>
        </div>
    )
}
