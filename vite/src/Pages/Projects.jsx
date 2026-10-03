import { useRef } from 'react'
import Wrapper from '../Components/UI/Wrapper'
import useScrollReveal from '../Components/useScrollReveal'
import styles from './Projects.module.css'

import cards from '../api/projects.json'
import { Link } from 'react-router-dom'

import { Globe, ArrowRight } from 'lucide-react'
import { GitHubIcon } from '../Components/UI/BrandIcons'

export default function Projects(){
    const ref = useRef(null)
    useScrollReveal(ref)

    return (
        <div className={styles.wrapper} ref={ref}>
            <p>view my work</p>
            <h1>Portfolio</h1>
            <div className={styles.cards}>
                {cards.map(card => {
                    const cover = card.Images && card.Images[0]
                    return (
                        <Wrapper key={card.id}>
                            <div className={styles.card} data-reveal>
                                <div className={`${styles.media} ${!cover ? styles.mediaFallback : ''}`}>
                                    {cover
                                        ? <img src={`/assets/${cover}`} alt={`${card.title} preview`} />
                                        : <span className={styles.monogram} aria-hidden="true">{card.title[0]}</span>
                                    }
                                    {card.status === 'in-progress' && <span className={styles.badge}>In Progress</span>}
                                    {card.type && <span className={styles.typeTag}>{card.type}</span>}
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
                                                    <GitHubIcon size={20} />
                                                </a>
                                            )}
                                            {card.website && (
                                                <a href={card.website} target="_blank" rel="noopener noreferrer" aria-label={`${card.title} live site`}>
                                                    <Globe size={20} aria-hidden="true" />
                                                </a>
                                            )}
                                        </div>
                                        <Link to={`/projects/${card.id}`} className={styles.detailsLink}>
                                            Details
                                            <ArrowRight size="1em" aria-hidden="true" />
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
