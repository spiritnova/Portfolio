import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock, Pause, Play } from 'lucide-react'
import styles from './ProjectCarousel.module.css'

const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// the live site's address, or the project name when it was never deployed
function addressBar(project){
    try { return new URL(project.website).hostname.replace(/^www\./, '') }
    catch { return project.title }
}

// shortest signed distance from a to b around a ring of n
function ringDistance(a, b, n){
    let d = ((b - a) % n + n) % n
    if (d > n / 2) d -= n
    return d
}

export default function ProjectCarousel({ projects }){
    const count = projects.length
    // with only a few projects, repeat them so a hidden slide is always waiting on each side
    // and the wrap-around happens off screen
    const slides = count < 6 ? [...projects, ...projects] : projects
    const n = slides.length

    const [active, setActive] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [focused, setFocused] = useState(false)
    const [inView, setInView] = useState(false)
    const [tabHidden, setTabHidden] = useState(false)
    const [userPaused, setUserPaused] = useState(false)
    const rootRef = useRef(null)
    const swipeRef = useRef(null)

    const autoplay = !reducedMotion && !userPaused
    const playing = autoplay && !hovered && !focused && inView && !tabHidden
    const current = active % count

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
        observer.observe(rootRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const onVisibility = () => setTabHidden(document.hidden)
        document.addEventListener('visibilitychange', onVisibility)
        return () => document.removeEventListener('visibilitychange', onVisibility)
    }, [])

    const go = step => setActive(a => (a + step + n) % n)

    function goTo(index){
        // pick whichever copy of that project is closest, so it slides the short way round
        let best = index
        for (let i = index; i < n; i += count){
            if (Math.abs(ringDistance(active, i, n)) < Math.abs(ringDistance(active, best, n))) best = i
        }
        go(ringDistance(active, best, n))
    }

    function onKeyDown(e){
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
    }

    function onPointerDown(e){
        if (e.pointerType === 'mouse') return
        swipeRef.current = e.clientX
    }

    function onPointerUp(e){
        if (swipeRef.current === null) return
        const dx = e.clientX - swipeRef.current
        swipeRef.current = null
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    }

    return (
        <div
            className={styles.carousel}
            ref={rootRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Recent projects"
            onKeyDown={onKeyDown}
            // only keyboard focus pauses; a mouse click on the arrows or play button shouldn't hold it
            onFocus={e => setFocused(e.target.matches(':focus-visible'))}
            onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false) }}
            data-reveal
        >
            <div
                className={styles.stage}
                aria-live={playing ? 'off' : 'polite'}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={() => { swipeRef.current = null }}
            >
                {slides.map((project, i) => {
                    const offset = ringDistance(active, i, n)
                    const isActive = offset === 0
                    const position = Math.max(-2, Math.min(2, offset))
                    const state = isActive ? styles.center : Math.abs(offset) === 1 ? styles.side : styles.hidden

                    return (
                        <div
                            className={`${styles.slide} ${state}`}
                            style={{ '--o': position }}
                            key={i}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${(i % count) + 1} of ${count}`}
                            aria-hidden={!isActive}
                        >
                            <Link
                                to={`/projects/${project.id}`}
                                className={styles.link}
                                tabIndex={isActive ? 0 : -1}
                                draggable={false}
                                onClick={e => {
                                    if (isActive) return
                                    e.preventDefault()
                                    go(offset)
                                }}
                            >
                                <div className={styles.frame}>
                                    <div className={styles.chrome} aria-hidden="true">
                                        <span className={styles.lights}><i></i><i></i><i></i></span>
                                        <span className={styles.url}>
                                            <Lock size={10} strokeWidth={2.5} />
                                            {addressBar(project)}
                                        </span>
                                    </div>
                                    <img src={`/assets/${project.Images[0]}`} alt="" loading="lazy" decoding="async" draggable={false} />
                                </div>
                                <div className={styles.caption}>
                                    <span className={styles.title}>
                                        {project.title}
                                        <ArrowUpRight size="1em" aria-hidden="true" />
                                    </span>
                                    <span className={styles.subtitle}>{project.subtitle}</span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>

            <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous project">
                <ChevronLeft strokeWidth={2.2} />
            </button>
            <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => go(1)} aria-label="Next project">
                <ChevronRight strokeWidth={2.2} />
            </button>

            <div className={styles.controls}>
                <div className={styles.dots}>
                    {projects.map((project, i) => (
                        <button
                            type="button"
                            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Show ${project.title}`}
                            aria-current={i === current}
                            key={project.id}
                        >
                            {i === current && (
                                // the fill is the autoplay timer: when it finishes, move on
                                <span
                                    className={`${styles.fill} ${autoplay ? styles.timed : ''}`}
                                    key={active}
                                    style={{ animationPlayState: playing ? 'running' : 'paused' }}
                                    onAnimationEnd={() => go(1)}
                                ></span>
                            )}
                        </button>
                    ))}
                </div>
                {!reducedMotion && (
                    <button
                        type="button"
                        className={styles.toggle}
                        onClick={() => {
                            setUserPaused(p => !p)
                            // pressing play means play now, even though focus is still on this button
                            setFocused(false)
                        }}
                        aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
                    >
                        {userPaused ? <Play size={14} /> : <Pause size={14} />}
                    </button>
                )}
            </div>
        </div>
    )
}
