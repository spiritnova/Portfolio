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