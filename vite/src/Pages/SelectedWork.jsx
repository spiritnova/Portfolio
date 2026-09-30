import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import styles from './Home.module.css'
import cardStyles from './Projects.module.css'
import projects from '../api/projects.json'
import useScrollReveal from '../Components/useScrollReveal'

const featured = projects.filter(p => p.status !== 'in-progress' && p.Images?.length).slice(0, 3)

// Lazy-loaded from Home so ScrollTrigger stays out of the first paint.
export default function SelectedWork(){
    const ref = useRef(null)
    useScrollReveal(ref)

    return (
        <section className={styles.work} ref={ref} aria-labelledby="selected-work">
            <div className={styles.workHeader} data-reveal>
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
    )
}
