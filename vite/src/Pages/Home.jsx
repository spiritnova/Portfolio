import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowRight, Copy, Check } from 'lucide-react'
import projects from '../api/projects.json'
import technologies from './Technologies'

const featuredTech = ['Javascript', 'React', 'Node js', 'Python', 'Flask', 'Git', 'HTML5', 'CSS3']
const stack = technologies.filter(tech => featuredTech.includes(tech.title))

function spotlight(e){
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)

    // magnetic pull: nudge the button a fraction of the way toward the cursor
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    e.currentTarget.style.translate = `${dx * 0.18}px ${dy * 0.28}px`
}

function release(e){
    e.currentTarget.style.translate = ''
}

const EMAIL = 'ibrahimabboud2000@gmail.com'

export default function Home(){
    const [copied, setCopied] = useState(false)
    const headingRef = useRef(null)

    useLayoutEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const ctx = gsap.context(() => {
            gsap.from(`.${styles.word}`, {
                yPercent: 110,
                duration: 0.9,
                ease: 'power4.out',
                stagger: 0.09,
                delay: 0.3,
            })
        }, headingRef)
        return () => ctx.revert()
    }, [])

    function copyEmail(){
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.glow} aria-hidden="true"></div>
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.texts} ref={headingRef}>
                        <p className={styles.greeting}>Hey there,</p>
                        <h1>my name is Ibrahim Abboud.<br />I am a <span className={styles.accent}>{['Full', 'Stack', 'Web', 'Developer'].map(word => (
                            <span className={styles.mask} key={word}><span className={styles.word}>{word}</span>{' '}</span>
                        ))}</span> based<br />in Beirut, Lebanon.</h1>
                    </div>
                    <div className={`${styles.buttons} ${styles.reveal}`} style={{ '--d': '120ms' }}>
                        <div className={styles.workWrap}>
                            <Link to="/projects" className={styles.primaryButton} onMouseMove={spotlight} onMouseLeave={release}>
                                <span className={styles.label}>View my work</span>
                                <ArrowRight className={styles.arrow} strokeWidth={2.4} aria-hidden="true" />
                            </Link>
                            <div className={styles.preview} aria-hidden="true">
                                <span className={styles.previewHead}>Recent projects</span>
                                {projects.slice(0, 3).map(p => (
                                    <div className={styles.previewItem} key={p.id}>
                                        <strong>{p.title}</strong>
                                        <span>{p.subtitle}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link to="/contactme" className={styles.secondaryButton} onMouseMove={spotlight} onMouseLeave={release}>
                            <span className={styles.label}>Contact me</span>
                        </Link>
                        <button type="button" className={styles.copyButton} onClick={copyEmail} aria-label="Copy email address">
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            <span className={styles.toast} role="status">{copied ? 'Email copied!' : ''}</span>
                        </button>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>3+</span>
                            <span className={styles.statLabel}>Years Experience</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>{projects.length + 2}</span>
                            <span className={styles.statLabel}>Projects Shipped</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>Full Stack</span>
                            <span className={styles.statLabel}>Front-End Focused</span>
                        </div>
                    </div>

                    <div className={styles.stack}>
                        {stack.map(tech => (
                            <div className={styles.stackItem} key={tech.title} title={tech.title}>
                                {tech.logo}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
