import styles from './About.module.css'
import pdf from '/assets/Ibrahim Abboud Resume.pdf'
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
                    <p>I'm a <b>Full Stack Web Developer</b> based in Beirut, Lebanon, with over 2 years of experience
                        building web applications with a stronger focus on front-end technologies. I enjoy turning
                        ideas into clean, functional products — from planning the architecture to shipping a polished
                        UI — and I pick up new languages and tools quickly when a project calls for them.
                        <br/>
                        <br/>
                        Outside of client and personal projects, I keep sharpening my skills in new languages and
                        design tools, and stay involved in the developer community.
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
                            window.open('/assets/Ibrahim Abboud Resume.pdf', "blank")
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