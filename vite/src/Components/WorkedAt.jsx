import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import experience from '../api/experience.json'
import styles from './WorkedAt.module.css'

gsap.registerPlugin(ScrollTrigger)

// The orbit is a quadratic curve in a 1000x300 box that echoes the planet's horizon above it.
// The SVG stretches to the section's width, and the stops are placed in % along the same curve.
const P0 = { x: 30, y: 200 }
const P1 = { x: 500, y: -40 }
const P2 = { x: 970, y: 200 }
const PATH = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`
const STOPS = [0.17, 0.5, 0.83]

function pointAt(t){
    const u = 1 - t
    return {
        x: u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x,
        y: u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y,
    }
}

function slopeAt(t){
    return {
        dx: 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x),
        dy: 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y),
    }
}

// oldest first, so the path reads as a journey that arrives at the current job
const jobs = [...experience].reverse()

export default function WorkedAt(){
    const rootRef = useRef(null)
    const orbitRef = useRef(null)
    const cometRef = useRef(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        const stops = [...root.querySelectorAll(`.${styles.stop}`)]
        const lightAll = () => stops.forEach(s => s.classList.add(styles.lit))

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
            lightAll()
            return
        }

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: root,
                start: 'top 75%',
                once: true,
                onEnter: () => {
                    // on phones the path runs down the screen: light the stops one after another
                    if (window.matchMedia('(max-width: 760px)').matches){
                        stops.forEach((s, i) => gsap.delayedCall(0.25 + i * 0.45, () => s.classList.add(styles.lit)))
                        return
                    }

                    // a comet travels the orbit and lights each stop as it passes
                    const comet = cometRef.current
                    const orbit = orbitRef.current
                    const state = { t: 0 }
                    gsap.set(comet, { opacity: 1 })
                    gsap.to(state, {
                        t: 1,
                        duration: 3.2,
                        ease: 'power1.inOut',
                        onUpdate: () => {
                            const { x, y } = pointAt(state.t)
                            const { dx, dy } = slopeAt(state.t)
                            const angle = Math.atan2(dy * orbit.clientHeight / 300, dx * orbit.clientWidth / 1000)
                            comet.style.left = `${x / 10}%`
                            comet.style.top = `${y / 3}%`
                            comet.style.transform = `translate(-100%, -50%) rotate(${angle}rad)`
                            STOPS.forEach((stop, i) => {
                                if (state.t >= stop) stops[i].classList.add(styles.lit)
                            })
                        },
                        onComplete: () => gsap.to(comet, { opacity: 0, duration: 0.5 }),
                    })
                },
            })
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <section id="worked-at" className={styles.workedAt} ref={rootRef} aria-labelledby="worked-at-heading">
            <h2 id="worked-at-heading" className={styles.label} data-rise>Where I've worked</h2>

            <div className={styles.orbit} ref={orbitRef}>
                <svg className={styles.path} viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
                    <path d={PATH} className={styles.trail} vectorEffect="non-scaling-stroke" />
                    <path d={PATH} className={styles.dots} vectorEffect="non-scaling-stroke" />
                </svg>

                <span className={styles.comet} ref={cometRef} aria-hidden="true"></span>

                <ol className={styles.stops}>
                    {jobs.map((job, i) => {
                        const { x, y } = pointAt(STOPS[i])
                        const current = job.period.includes('Present')
                        return (
                            <li
                                key={job.company}
                                className={`${styles.stop} ${current ? styles.current : ''}`}
                                style={{ '--x': `${x / 10}%`, '--y': `${y / 3}%` }}
                            >
                                <span className={styles.dot} aria-hidden="true"></span>
                                <span className={styles.text}>
                                    <span className={styles.company}>{job.company}</span>
                                    <span className={styles.role}>
                                        {job.role} · <span className={current ? styles.now : ''}>{job.period}</span>
                                    </span>
                                </span>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}
