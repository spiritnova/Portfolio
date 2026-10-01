import { useRef } from 'react'
import styles from './About.module.css'
import useScrollReveal from '../Components/useScrollReveal'
import pdf from '/assets/Ibrahim Abboud Resume.pdf'
import { Download, Eye } from 'lucide-react'

import { Link } from 'react-router-dom'
import technologies from './Technologies'
import experience from '../api/experience.json'

export default function About(){
    const ref = useRef(null)
    useScrollReveal(ref)

    return (
        <div className={styles.about} ref={ref}>
            <div className={styles.aboutme} data-reveal>
                <div className={styles.content}>
                    <h1>About Ibrahim Abboud</h1>
                    <p>I'm a <b>Full Stack Web Developer</b> based in Beirut, Lebanon, with over 3 years of experience
                        building web applications, mostly on the front end.
                        <br/>
                        <br/>
                        What I love most about this work is taking someone's problem and turning it into something
                        that actually solves it. I like sitting down with what people need, figuring out the right way
                        to build it, and then seeing them use it. That's the part that never gets old for me, whether
                        I'm planning the architecture or polishing the last bit of UI.
                    </p>
                </div>
            </div>

            <div className={styles.experience}>
                <h2 className={styles.title} data-reveal>Experience</h2>
                <ol className={styles.timeline}>
                    {experience.map(job => (
                        <li className={styles.job} key={job.company} data-reveal>
                            <div className={styles.jobHead}>
                                <div>
                                    <h3>{job.role}</h3>
                                    <p className={styles.company}>
                                        {job.company}{job.context && <span> ({job.context})</span>}
                                    </p>
                                </div>
                                <span className={styles.period}>{job.period}</span>
                            </div>
                            <ul className={styles.points}>
                                {job.points.map(point => <li key={point}>{point}</li>)}
                            </ul>
                            <div className={styles.jobFoot}>
                                <div className={styles.chips}>
                                    {job.tech.map(t => <span className={styles.chip} key={t}>{t}</span>)}
                                </div>
                                {job.projectId && (
                                    <Link to={`/projects/${job.projectId}`} className={styles.caseLink}>View project</Link>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
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
