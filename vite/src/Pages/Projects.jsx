import Wrapper from '../Components/UI/Wrapper'
import styles from './Projects.module.css'

import cards from '../api/projects.json'
import { Link } from 'react-router-dom'

import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Projects(){
    return (
        <div className={styles.wrapper}>
            <p>view my work</p>
            <h1>Portfolio</h1>
            <div className={styles.cards}>
                {cards.map(card => {
                    const cover = card.Images && card.Images[0]
                    return (
                        <Wrapper key={card.id}>
                            <div className={styles.card}>
                                <div className={`${styles.media} ${!cover ? styles.mediaFallback : ''}`}>
                                    {cover
                                        ? <img src={`/assets/${cover}`} alt={`${card.title} preview`} />
                                        : <span className={styles.monogram} aria-hidden="true">{card.title[0]}</span>
                                    }
                                    {card.status === 'in-progress' && <span className={styles.badge}>In Progress</span>}
                                </div>
                                <div className={styles.body}>
                                    <span className={styles.eyebrow}>{card.subtitle}</span>
                                    <h3 className={styles.title}>{card.title}</h3>
                                    <div className={styles.chips}>
                                        {card.technologies.map(tech => (
                                            <span className={styles.chip} key={tech}>{tech}</span>
                                        ))}
                                    </div>
                                    <div className={styles.footer}>
                                        <div className={styles.iconLinks}>
                                            {card.github && (
                                                <a href={card.github} target="_blank" rel="noopener noreferrer" aria-label={`${card.title} GitHub repository`}>
                                                    <GitHubIcon fontSize="small" />
                                                </a>
                                            )}
                                            {card.website && (
                                                <a href={card.website} target="_blank" rel="noopener noreferrer" aria-label={`${card.title} live site`}>
                                                    <LanguageIcon fontSize="small" />
                                                </a>
                                            )}
                                        </div>
                                        <Link to={`/projects/${card.id}`} className={styles.detailsLink}>
                                            Details
                                            <ArrowForwardIcon fontSize="inherit" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    )
                })}
            </div>
        </div>
    )
}
