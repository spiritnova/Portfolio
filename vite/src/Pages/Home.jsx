import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import projects from '../api/projects.json'
import technologies from './Technologies'

const featuredTech = ['Javascript', 'React', 'Node js', 'Python', 'Flask', 'Git', 'HTML5', 'CSS3']
const stack = technologies.filter(tech => featuredTech.includes(tech.title))

export default function Home(){
    return (
        <div className={styles.wrapper}>
            <div className={styles.glow} aria-hidden="true"></div>
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.texts}>
                        <h2>Hey there,</h2>
                        <h1>my name is Ibrahim Abboud.</h1>
                        <h1>I am a <span>Full Stack Web Developer</span> based</h1>
                        <h1>in Beirut, Lebanon.</h1>
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.btn}><Link to={'/contactme'}>Contact me</Link></div>
                        <div className={styles.btn}><Link to={'/projects'}>My portfolio</Link></div>
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