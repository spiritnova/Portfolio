import { useRef } from 'react'
import styles from './About.module.css'
import useScrollReveal from '../Components/useScrollReveal'
import pdf from '/assets/Ibrahim Abboud Resume.pdf'
import { Download, Eye } from 'lucide-react'

import technologies from './Technologies'

export default function About(){
    const ref = useRef(null)
    useScrollReveal(ref)

    return (
        <div className={styles.about} ref={ref}>
            <div className={styles.aboutme} data-reveal>
                <div className={styles.content}>
                    <h1>About Ibrahim Abboud</h1>
                    <p>I'm a <b>Full Stack Web Developer</b> based in Beirut, Lebanon, with over 3 years of experience
                        building web applications with a stronger focus on front-end technologies. I enjoy turning
                        ideas into clean, functional products — from planning the architecture to shipping a polished
                        UI — and I pick up new languages and tools quickly when a project calls for them.
                        <br/>
                        <br/>
                        Outside of client and personal projects, I keep sharpening my skills in new languages and
                        design tools, and stay involved in the developer community.
                    </p>
                </div>
            </div>

            <div className={styles.tech}>
                <h2 className={styles.title} data-reveal>Most used technologies</h2>

                <div className={styles.langs}>
                    {technologies.map(lang => (
                    <div className={styles.lang} key={lang.title} data-reveal>
                        {lang.logo}
                        <span>{lang.title}</span>
                    </div>
                    ))}
                </div>
            </div>
            <div className={styles.container} data-reveal>
                <h2 className={styles.resumeTitle}>Resume</h2>
                <div className={styles.buttons}>
                    <a className={styles.primaryButton} href={pdf} download>
                        Download
                        <Download size={18} aria-hidden="true" />
                    </a>
                    <a className={styles.secondaryButton} href={pdf} target="_blank" rel="noreferrer">
                        View
                        <Eye size={18} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    )
}
