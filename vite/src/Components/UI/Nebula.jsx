import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Nebula.module.css'

gsap.registerPlugin(ScrollTrigger)

// cloud layers are pre-rendered by scripts/generate-nebula.mjs; each one drifts on its own timing
const LAYERS = [
    { src: '/nebula/violet.webp', className: styles.violet },
    { src: '/nebula/magenta.webp', className: styles.magenta },
    { src: '/nebula/teal.webp', className: styles.teal },
    { src: '/nebula/core.webp', className: styles.core },
    { src: '/nebula/dust.webp', className: styles.dust },
]

// `quiet` is the faint backdrop used on other pages: just the drifting clouds,
// without the bright star, the planet or the scroll effect
export default function Nebula({ quiet = false }){
    const [loaded, setLoaded] = useState(0)
    const rootRef = useRef(null)
    const skyRef = useRef(null)
    const planetRef = useRef(null)
    const rimRef = useRef(null)
    // fade the clouds in together once every layer has arrived, so they never pop in one by one
    const ready = loaded >= LAYERS.length

    // scrolling down is the camera dropping toward the planet: the sky lags behind,
    // the planet rises to meet you and its rim catches more light
    useLayoutEffect(() => {
        if (quiet || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const ctx = gsap.context(() => {
            const scrub = {
                trigger: rootRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
            }
            gsap.to(skyRef.current, { yPercent: 28, ease: 'none', scrollTrigger: scrub })
            gsap.to(planetRef.current, { y: -90, ease: 'none', scrollTrigger: scrub })
            gsap.fromTo(rimRef.current, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: scrub })
        }, rootRef)

        return () => ctx.revert()
    }, [quiet])

    return (
        <div ref={rootRef} className={`${styles.nebula} ${quiet ? styles.quiet : ''} ${ready ? styles.ready : ''}`} aria-hidden="true">
            <div ref={skyRef} className={styles.sky}>
                {LAYERS.map(layer => (
                    <img
                        key={layer.src}
                        src={layer.src}
                        alt=""
                        decoding="async"
                        className={`${styles.cloud} ${layer.className}`}
                        onLoad={() => setLoaded(n => n + 1)}
                        onError={() => setLoaded(n => n + 1)}
                    />
                ))}

                {!quiet && (
                    <div className={styles.star}>
                        <span className={styles.spikes}></span>
                        <span className={styles.core}></span>
                    </div>
                )}
            </div>

            {!quiet && (
                <div ref={planetRef} className={styles.planet}>
                    <span ref={rimRef} className={styles.rim}></span>
                </div>
            )}
        </div>
    )
}
