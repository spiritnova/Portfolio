import styles from './About.module.css'
import pdf from '/assets/ibrahimabboud.pdf'
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';

import technologies from './Technologies'

export default function About(){
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
                        Outside work, I continue working on my skills ( languages and design ), then spend the rest of my time with my friends playing games, hiking or eating food
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
                        <Button 
                        variant="outlined" 
                        endIcon={<VisibilityIcon />} 
                        onClick={() => {
                            window.open('/assets/ibrahimabboudresume.png', "blank")
                        }}>
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
        </div>
    )
}