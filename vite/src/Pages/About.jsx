import styles from './About.module.css'
import power from '../Assets/power.svg'
import resume from '../Assets/resume.png'
import pdf from '../Assets/resume.pdf'
import { useState } from 'react'
import Wrapper from '../Components/UI/Wrapper'
import View from '../Assets/View'
import Download from '../Assets/Download'

export default function About(){
    const [showModal, setShowModal] = useState(false)

    return (
        <Wrapper>
            <div className={styles.aboutme}>
                <div className={styles.content}>
                    <h2>About Ibrahim Abboud</h2>
                    <p>I am a 22 years old passionate <b>Fullstack Web developer</b> based in beirut, Lebanon who enjoys building
                        webapps. Very positive and highly motivated person with over 2 years of experience in building
                        beautiful websites and web applictions with a stronger focus on the Front-end technologies,
                        I also have a very high aptitude for learning and adapting to new languages and features.
                        <br/>
                        <br/>
                        Outside work, I spend most of time with my friends playing games, watching anime or eating food
                        in restaurants.
                    </p>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <button className={styles.view} onClick={() => setShowModal(true)}>
                        <span>View</span>
                        <View/>
                    </button>
                    <a href={pdf} download>
                        <span>Download Resume</span>
                        <Download/>
                    </a>
                </div>
                <div className={styles.computer}>
                    <div className={styles.screenBorder}>
                        <img src={resume}/>
                        <div className={styles.screen}>
                            <button className={styles.power}>
                                <img src={power} onClick={() => setShowModal(true)}/>
                            </button>
                        </div>
                    </div>
                    <div className={styles.stand}></div>
                    <div className={styles.flat}></div>
                </div>
            </div>

            {showModal && <div className={styles.backdrop} onClick={() => setShowModal(false)}></div>}
            {showModal && 
                <img src={resume} className={styles.modal}/>
            }
        </Wrapper>
    )
}