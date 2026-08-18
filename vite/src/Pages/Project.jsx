import styles from './Project.module.css'
import projects from '../api/projects.json'

import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Error404 from '../Components/UI/Error404';
import Lightbox from '../Components/UI/Lightbox';
import technologies from './Technologies';

export default function Project() {
    const [prevIsDisabled, setPrevIsDisabled] = useState()
    const [nextIsDisabled, setNextIsDisabled] = useState()
    const [lightboxIndex, setLightboxIndex] = useState(null)

    const { id } = useParams()
    const item = projects.find(project => project.id === parseInt(id))

    const pages = projects.map(project => project.id)
    const max = Math.max(...pages)

    
    if(!item){
        return <Error404/>
    }

    const languages = []
    item.technologies.forEach(tech => {
        technologies.forEach(lang => {
            if(tech === lang.title){
                languages.push(lang)
            }
        })
    })

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

        setLightboxIndex(null)
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
                <div className={styles.technologies}>
                    {languages.map(lang => (
                        <span key={lang.title}>{lang.logo}</span>
                    ))}
                </div>
                <div className={styles.links}>
                    {item.website && (
                        <a href={item.website} target="_blank" rel="noopener noreferrer">
                            <span className={styles.text}>Visit</span>
                            <span className={styles.icon}><LanguageIcon/></span>
                        </a>
                    )}
                    {item.github && (
                        <a href={item.github} target="_blank" rel="noopener noreferrer">
                            <span className={styles.text}>View source code</span>
                            <span className={styles.icon}><GitHubIcon/></span>
                        </a>
                    )}
                </div>
            </div>

            <div className={styles.images}>
                {item.Images && item.Images.map((image, index) => (
                    <img
                        src={`/assets/${image}`}
                        alt={`${item.title} screenshot ${index + 1}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        onClick={() => setLightboxIndex(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setLightboxIndex(index) }}
                        key={image}
                    />
                ))}
            </div>
        </div>

        {lightboxIndex !== null && (
            <Lightbox
                images={item.Images}
                index={lightboxIndex}
                basePath="/assets/"
                title={item.title}
                onClose={() => setLightboxIndex(null)}
                onChange={setLightboxIndex}
            />
        )}
    </div>
  )
}
