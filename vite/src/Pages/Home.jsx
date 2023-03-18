import styles from './Home.module.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Home(){
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.texts}>
                        <h2>Hey there,</h2>
                        <h1>my name is Ibrahim Abboud.</h1>
                        <h1>I am <span>Full Stack Web Developer</span> based</h1>
                        <h1>in Beirut, Lebanon.</h1>
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.btn}><a href="#" onClick={() => setShowModal(true)}>Contact me</a></div>
                        <div className={styles.btn}><Link to={'/projects'}>My portfolio</Link></div>
                    </div>
                </div>
            </div>

            {showModal && <div className={styles.backdrop} onClick={() => setShowModal(false)}></div>}
            {showModal && 
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1>Contact</h1>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentInfo}>
                        <PhoneIcon/>
                        <p>81 586 049</p>
                    </div>
                    <div className={styles.contentInfo}>
                        <MailOutlineIcon/>
                        <p>coraynova@hotmail.com</p>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}