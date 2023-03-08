import Button from '../Components/UI/Button';
import styles from './Home.module.css'
import img from '../Assets/image3-min.png'
import { Link } from 'react-router-dom'

export default function Home(){
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.info}>
                        <h4>Hello, I am</h4>
                        <h1>Ibrahim Abboud</h1>
                        <h1>a <span>React web developer</span></h1>
                        <div className={styles.buttons}>
                            <Button text={'Contact me'}/>
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
        </div>
    )
}