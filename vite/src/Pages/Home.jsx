import styles from './Home.module.css'
import { Link } from 'react-router-dom'

export default function Home(){
    return (
        <div className={styles.wrapper}>
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
                </div>
            </div>
        </div>
    )
}