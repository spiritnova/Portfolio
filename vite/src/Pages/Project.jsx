import styles from './Project.module.css'
import projects from '../api/projects.json'

import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Error404 from '../Components/UI/Error404';

export default function Project() {
    const [prevIsDisabled, setPrevIsDisabled] = useState()
    const [nextIsDisabled, setNextIsDisabled] = useState()

    const { id } = useParams()
    const item = projects.find(project => project.id === parseInt(id))

    const pages = projects.map(project => project.id)
    const max = Math.max(...pages)

    
    if(!item){
        return <Error404/>
    }

    useEffect(() => {
        if(parseInt(id) === 1){
            setPrevIsDisabled(true)
        }

        else if(parseInt(id) > 1){
            setPrevIsDisabled(false)
        }

        if(parseInt(id) >= max){
            setNextIsDisabled(true)
        }

        else if(parseInt(id) < max){
            setNextIsDisabled(false)
        }
    }, [id])

  return (
    <div className={styles.container}>
        <div className={styles.project}>
            <div className={styles.details}>
                <div className={styles.navigation}>
                    <Link to={prevIsDisabled ? '' : `/projects/${parseInt(id) - 1}`} className={prevIsDisabled ? styles.disabled : ''}>
                        <div className={styles.caption}>Prev</div>
                        <ChevronLeftIcon/>
                    </Link>
                    <Link to={nextIsDisabled ? '' : `/projects/${parseInt(id) + 1}`} className={nextIsDisabled ? styles.disabled : ''}>
                        <div className={styles.caption}>Next</div>
                        <ChevronRightIcon/>
                    </Link>
                </div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <div className={styles.links}>
                    <a href={item.website}>
                        <span className={styles.text}>Visit</span>
                        <span className={styles.icon}><LanguageIcon/></span>
                    </a>
                    <a href={item.github}>
                        <span className={styles.text}>View source code</span>
                        <span className={styles.icon}><GitHubIcon/></span>
                    </a>
                </div>
            </div>

            <div className={styles.images}>
                <div className={styles.image}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas voluptate quis facere nemo, animi asperiores sunt. Odio consequatur porro iure mollitia quis hic, debitis nihil natus, atque consectetur quibusdam minus.</div>
            </div>
        </div>
    </div>
  )
}
