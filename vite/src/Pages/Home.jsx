import Button from '../Components/UI/Button';
import styles from './Home.module.css'
import img from '../Assets/image3-min.png'
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Home(){
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.info}>
                        <h4>Hello, I am</h4>
                        <h1>Ibrahim Abboud</h1>
                        <h1>a <span>React web developer</span></h1>
                        <div className={styles.buttons}>
                            <Button text={'Contact me'} onClick={() => setShowModal(true)}/>
                            <Link to={'/projects'}>
                                <Button text={'Browse portfolio'}/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.grid}>
                    <img src={img}/>
                </div>
            </div>

            {showModal && <div className={styles.backdrop} onClick={() => setShowModal(false)}></div>}
            {showModal && 
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1>Contact</h1>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentIcons}></div>
                    <div className={styles.contentInfo}>
                        <p>81 586 049</p>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}