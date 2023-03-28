import styles from './About.module.css'
import resume from '../Assets/ibrahimabboudresume.png'
import pdf from '../Assets/ibrahimabboud.pdf'
import { useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';

import technologies from './Technologies'

export default function About(){
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={styles.about}>
            <div className={styles.aboutme}>
                <div className={styles.content}>
                    <h2>About Ibrahim Abboud</h2>
                    <p>I am a 22 years old passionate <b>Fullstack Web developer</b> based in beirut, Lebanon who enjoys building
                        webapps. Very positive and highly motivated person with over 2 years of experience in building
                        beautiful websites and web applictions with a stronger focus on the Front-end technologies,
                        I also have a very high aptitude for learning and adapting to new languages and features.
                        <br/>
                        <br/>
                        Outside work, I spend most of time with my friends playing games, hiking or eating food
                        in restaurants.
                    </p>
                </div>
            </div>

            <div className={styles.tech}>
                <h1 className={styles.title}>Most used technologies</h1>

                <div className={styles.langs}>
                    {technologies.map(lang => (
                    <div className={styles.lang} key={lang.title}>
                        {lang.logo}
                        <span>{lang.title}</span>
                    </div>
                    ))}
                </div>
            </div>
            <div className={styles.container}>
                <h1 style={{color: "white"}}>Resume</h1>
                <div className={styles.buttons}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" endIcon={<VisibilityIcon />} onClick={() => setShowModal(true)}>
                            View
                        </Button>
                        <a href={pdf} download>
                            <Button variant="contained" endIcon={<DownloadIcon />}>
                                Download
                            </Button>
                        </a>
                    </Stack>
                </div>
            </div>

            {showModal && <div className={styles.backdrop} onClick={() => setShowModal(false)}></div>}
            {showModal && 
                <img src={resume} className={styles.modal}/>
            }
        </div>
    )
}